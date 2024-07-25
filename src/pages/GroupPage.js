import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GroupRequestModal from "../components/GroupRequestModal";
import GroupCreateModal from "../components/GroupCreateModal";
import { getGroups, createGroup, getGroupRecords } from "../api"; // getGroupRecords 함수 추가

const GroupPage = ({ onGroupClick }) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const defaultGroupImage = "path/to/default/image.png"; // 기본 이미지 경로 설정
  const [groups, setGroups] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        const groupsData = response.data.map((group) => ({
          ...group,
          members: group.members || [], // 멤버가 없으면 빈 배열로 초기화
        }));
        setGroups(groupsData);
      } catch (error) {
        console.error("Failed to fetch groups", error);
      }
    };

    fetchGroups();
  }, []);

  const handleRequestJoinClick = (group) => {
    console.log("handleRequestJoinClick called with group:", group);

    if (!group || !group._id) {
      console.error("Group or group._id is undefined", group);
      return;
    }

    setSelectedGroup(group);
    setIsRequestModalOpen(true);
  };

  const handleCreateGroup = async (newGroup) => {
    try {
      const response = await createGroup(
        newGroup.name,
        newGroup.description,
        newGroup.image
      );
      const newGroupWithMembers = {
        ...response.data,
        members: [{ username: user.username }], // 그룹 리더를 멤버로 추가
      };
      setGroups([...groups, newGroupWithMembers]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Failed to create group", error);
    }
  };

  const handleGroupClick = async (group) => {
    if (!group || !group._id) {
      console.error("Group or group._id is undefined", group);
      return;
    }

    try {
      const response = await getGroupRecords(group._id); // 그룹 레코드 조회
      const records = response.data;

      // 그룹 레코드 페이지로 이동하며 조회된 레코드를 전달
      onGroupClick(group, records);
    } catch (error) {
      console.error("Failed to fetch group records", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Join Groups</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsCreateModalOpen(true)}
      >
        + Add New Group
      </button>
      <div className="grid grid-cols-3 gap-4">
        {groups.map((group) => (
          <div
            key={group._id} // 각 그룹에 고유한 키 추가
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => handleGroupClick(group)} // 그룹 클릭 시 handleGroupClick 호출
          >
            <img
              src={group.image || defaultGroupImage}
              alt="Group"
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2">{group.name}</h2>
            <p className="text-gray-600 mb-4">{group.description}</p>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleRequestJoinClick(group);
              }}
            >
              Request Join
            </button>
          </div>
        ))}
      </div>
      {selectedGroup && (
        <GroupRequestModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          group={selectedGroup}
        />
      )}
      <GroupCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
};

export default GroupPage;
