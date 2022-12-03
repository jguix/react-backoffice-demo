import React, { FC } from 'react';
import './page-header.component.scss';

type Props = {
  title: string;
  backgroundImageUrl?: string;
};

export const BOPageHeader: FC<Props> = ({ title, backgroundImageUrl = 'http://lorempixel.com/1500/1000' }) => {
  return (
    <div className="pageHeader">
      <img alt="page header hero" className="pageImage" src={backgroundImageUrl} />
      <div className="pageTitle">{title}</div>
    </div>
  );
};
