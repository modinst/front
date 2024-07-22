import React, { useState, useEffect } from "react";
import GroupRequestModal from "../components/GroupRequestModal";
import GroupCreateModal from "../components/GroupCreateModal";
import axios from 'axios';

const GroupPage = ({ onGroupClick }) => {
  const defaultGroupImage = "path/to/default/image.png"; // 기본 이미지 경로 설정
  const [groups, setGroups] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://172.10.7.103/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleRequestJoinClick = (group) => {
    setSelectedGroup(group);
    setIsRequestModalOpen(true);
  };

  const handleCreateGroup = (newGroup) => {
    const newGroupId = groups.length + 1;
    const groupWithId = {
      id: newGroupId,
      name: newGroup.groupName,
      description: newGroup.description,
      image: newGroup.groupPicture || defaultGroupImage,
      members: [],
    };
    setGroups([...groups, groupWithId]);
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
            key={group._id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => onGroupClick(group)}
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
