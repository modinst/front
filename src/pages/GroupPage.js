import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GroupRequestModal from "../components/GroupRequestModal";
import GroupCreateModal from "../components/GroupCreateModal";
import { getGroups, createGroup, requestJoinGroup } from "../api";

const GroupPage = ({ onGroupClick }) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user); // Redux 상태에서 사용자 정보 가져오기
  const defaultGroupImage = "path/to/default/image.png"; // 기본 이미지 경로 설정
  const [groups, setGroups] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        setGroups(response.data);
      } catch (error) {
        console.error("Failed to fetch groups", error);
      }
    };

    fetchGroups();
  }, []);

  const handleRequestJoinClick = async (group) => {
    setSelectedGroup(group);
    setIsRequestModalOpen(true);

    try {
      await requestJoinGroup(group.id);
      alert("Join request sent!");
    } catch (error) {
      console.error("Failed to send join request", error);
    }
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

  const handleGroupClick = (group) => {
    if (onGroupClick) {
      onGroupClick(group);
    } else {
      history.push(`/group/${group.id}`);
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
            key={group.id} // 각 그룹에 고유한 키 추가
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => handleGroupClick(group)}
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
