import React from "react";

import TopicListItem from "./TopicListItem";
import "../styles/TopicList.scss";

const TopicList = ({ topics, getPhotosByTopicId }) => {

  return (
    <div className="top-nav-bar__topic-list">
      {topics.map(topic => (
        <TopicListItem key={topic.id} topic={topic} getPhotosByTopicId={getPhotosByTopicId} />
      ))}
    </div>
  );
};

export default TopicList;
