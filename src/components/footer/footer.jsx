import footerStyles from './footer.module.css';
import BigLogo from '../../assets/images/bigLogo.png';

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.topSection}>
        <div className={footerStyles.leftContent}>
          <h1 className={footerStyles.title}>
            <span className={footerStyles.vortex}>Vortex </span>
            <span className={footerStyles.media}>Media</span>
          </h1>
          <div className={footerStyles.categories}>
            <span>World</span>
            <span>Politics</span>
            <span>Sports</span>
            <span>Business</span>
            <span>Entertainment</span>
          </div>
          <button className={footerStyles.contactButton}>Contact Developers</button>
        </div>
        <div className={footerStyles.logoWrapper}>
          <img src={BigLogo} alt="Vortex Media Logo" className={footerStyles.logo} />
        </div>
      </div>
      <div className={footerStyles.divider}></div>
      <div className={footerStyles.termsSection}>
        <p className={footerStyles.links}>
          Terms of Use Privacy Policy Cookie Settings Ad Choices Accessibility & CC About Newsletters Transcripts
        </p>
        <p className={footerStyles.bottomText}>
          © 2024 Application Development. A Course Subject in Bachelor in Science in Information Technology. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;