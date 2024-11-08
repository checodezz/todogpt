import { GitHub, LinkedIn, Public } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={iconContainerStyle}>
          <IconButton
            href="https://github.com/checodezz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub style={iconStyle} />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/checodezz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn style={iconStyle} />
          </IconButton>
          <IconButton
            href="https://chethankumar.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Public style={iconStyle} />
          </IconButton>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "transparent",
  color: "#333",
  padding: "20px",
  position: "relative",
  width: "100%",
  textAlign: "center",
  marginTop: "auto",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
};

const iconContainerStyle = {
  display: "flex",
  gap: "15px",
};

const iconStyle = {
  color: "#333",
  transition: "color 0.3s ease",
};

export default Footer;
