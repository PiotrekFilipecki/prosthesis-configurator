import React from 'react';

interface StartupLoaderProps {
  logoSrc: string;
  rootRef: React.RefObject<HTMLDivElement>;
}

const StartupLoader: React.FC<StartupLoaderProps> = ({ logoSrc, rootRef }) => (
  <div ref={rootRef} className="startup-loader" role="status" aria-live="polite">
    <div className="startup-loader__panel">
      <div className="startup-loader__glow startup-loader__glow--primary" aria-hidden="true" />
      <div className="startup-loader__glow startup-loader__glow--secondary" aria-hidden="true" />

      <div className="startup-loader__content">
        <div className="startup-loader__eyebrow startup-loader__animate">Glaze Prosthetics</div>

        <div className="startup-loader__brand startup-loader__animate">
          <img className="startup-loader__logo" src={logoSrc} alt="" />
          <div className="startup-loader__copy">
            <h1 className="startup-loader__title">Configurator</h1>
            <p className="startup-loader__subtitle">Preparing a smooth fitting experience.</p>
          </div>
        </div>

        <div className="startup-loader__progress startup-loader__animate" aria-hidden="true">
          <span className="startup-loader__progress-bar" />
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(StartupLoader);
