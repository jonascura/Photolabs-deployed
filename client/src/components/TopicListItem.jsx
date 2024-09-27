import React from "react";

import "../styles/TopicListItem.scss";

const TopicListItem = ({ getPhotosByTopicId, topic }) => {
  // console.log("in TopicListItem", getPhotosByTopicId, topic)
  
  const { id, slug, title } = topic;

  return (
    <div className="topic-list__item">
      <span className="topic-list__item span" onClick={() => getPhotosByTopicId(id)} >{title}</span>
    </div>
  );
};


export default TopicListItem;
