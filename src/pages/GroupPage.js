import React, { useState } from "react";
import GroupRequestModal from "../components/GroupRequestModal";
import GroupCreateModal from "../components/GroupCreateModal";

const GroupPage = () => {
  const defaultGroupImage = "경로"; // 기본 이미지 경로 설정
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Jason's Group",
      description: "description~~...",
      image: "image.png",
      members: ["name1", "name2", "name3", "name4"],
    },
    {
      id: 2,
      name: "Duane Dean",
      description: "description~~...",
      image: "image-2.png",
      members: ["name5", "name6", "name7", "name8"],
    },
    {
      id: 3,
      name: "Jonathan Barker",
      description: "description~~...",
      image: "image-3.png",
      members: ["name9", "name10", "name11", "name12"],
    },
  ]);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

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
          <div key={group.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={group.image}
              alt="Group"
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2">{group.name}</h2>
            <p className="text-gray-600 mb-4">{group.description}</p>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              onClick={() => handleRequestJoinClick(group)}
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
