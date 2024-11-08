import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [scrolling, setScrolling] = useState(false);

  // Function to scroll to the next section
  const handleScrollDown = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      });
      setScrolling(true);
    }
  };

  return (
    <section
      ref={ref}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Hero Title Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -100, scale: 0.9, rotate: -20 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : -100,
          scale: inView ? 1 : 0.9,
          rotate: inView ? 0 : -20,
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          delay: 0.3,
        }}
        style={{
          fontSize: "4rem",
          fontWeight: "700",
          color: "#333",
          fontFamily: "Poppins, sans-serif",
          letterSpacing: "1.5px",
          lineHeight: "1.2",
          textAlign: "center",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        Welcome to{" "}
        <motion.span
          initial={{ scale: 1 }}
          animate={{
            scale: inView ? 1.1 : 1,
            color: inView ? "#ff6f61" : "#333", // Change color when in view
            textShadow: inView ? "0 0 20px rgba(255, 111, 97, 0.8)" : "none",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 1,
          }}
        >
          Todo-GPT
        </motion.span>
      </motion.h1>

      {/* Powered by FinOpsly AI Animation */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 1,
        }}
        style={{
          //   fontSize: "1.7rem",
          //   fontWeight: "700",
          color: "#888",
          fontFamily: "Roboto, sans-serif",
          marginTop: "20px",
          lineHeight: "1.5",
          letterSpacing: "1px",
          cursor: "pointer",
        }}
        whileHover={{
          color: "#ff6f61",
          scale: 1.1,
        }}
        className="display-6"
      >
        Powered by FinOpsly AI
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 0.5,
        }}
        style={{
          fontSize: "1.3rem",
          color: "#555",
          maxWidth: "700px",
          marginTop: "20px",
          lineHeight: "1.6",
          fontFamily: "Roboto, sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        Your personal AI-powered task manager. Organize your tasks and increase
        productivity with ease. Stay focused and accomplish more effortlessly.{" "}
        <strong>
          By dragging and dropping your tasks according to their status,
        </strong>{" "}
        you'll effortlessly manage your workflow.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 30,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 1.5,
        }}
        style={{
          position: "absolute",
          bottom: "20px",
          zIndex: 1,
        }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [1, 0.6, 1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          onClick={handleScrollDown}
          style={{
            cursor: "pointer",
            fontSize: "3rem",
            color: "#333",
            fontWeight: "bold",
            letterSpacing: "1px",
            display: "block",
          }}
        >
          &#x2193;
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
