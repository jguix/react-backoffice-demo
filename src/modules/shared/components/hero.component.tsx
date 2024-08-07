import React, { FC } from 'react';
import './hero.component.scss';

type Props = {
  title: string;
  backgroundImageUrl?: string;
};

export const BOHero: FC<Props> = ({
  title,
  backgroundImageUrl = 'http://lorempixel.com/1500/1000',
}) => {
  return (
    <div data-testid="hero" className="hero">
      <img alt="page header hero" className="pageImage" src={backgroundImageUrl} />
      <div data-testid="hero-title" className="pageTitle">
        {title}
      </div>
    </div>
  );
};
