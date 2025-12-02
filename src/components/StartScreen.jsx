import React, { useEffect, useRef } from "react";
import Parallax from "parallax-js";
import "./StartScreen.css";
import linuxImage from "../image/linux.jpg";
import devopsImage from "../image/devops.png";
import networkingImage from "../image/networking.png";
import ProgrammingImage from "../image/programing.jpg";
import cloudImage from "../image/Cloud.png";
import dockerImage from "../image/Docker.png";
import kubernetesImage from "../image/Kubernetes.png";
import logo from "../image/logo.png";
import mainphoto from "../image/mainphoto.jpg";

function StartScreen({ onStart }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      const parallaxInstance = new Parallax(sceneRef.current);

      return () => {
        parallaxInstance.destroy();
      };
    }
  }, []);

  return (
    <div>
      <nav className="mainNav mb-5">
        <div className="mainNav__logo"><img src={logo} alt="logo" className="mainNav__logo" height="100" width="100" /></div>
        <div className="mainNav__links">
          <a href="/" className="mainNav__link text-white">
            About
          </a>
          <a href="/" className="mainNav__link text-white">
            Projects
          </a>
          <a href="/" className="mainNav__link text-white">
            Team
          </a>
          <a href="/" className="mainNav__link text-white">
            Contacts
          </a>
        </div>
        <div className="mainNav__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g data-name="Layer 2" fill="#0D1117">
              <g data-name="menu-2">
                <rect
                  width="24"
                  height="24"
                  transform="rotate(180 12 12)"
                  opacity="0"
                />
                <circle cx="4" cy="12" r="1" />
                <rect x="7" y="11" width="14" height="2" rx=".94" ry=".94" />
                <rect x="3" y="16" width="18" height="2" rx=".94" ry=".94" />
                <rect x="3" y="6" width="18" height="2" rx=".94" ry=".94" />
              </g>
            </g>
          </svg>
        </div>
      </nav>

      <header className="mainHeading">
        <div className="mainHeading__content">
          <article className="mainHeading__text">
            <p className="mainHeading__preTitle">Programming</p>
            <h2 className="mainHeading__title">Beyond the Basics</h2>
            <p className="mainHeading__description">
              Far beyond the familiar lines of code, far from the repetitive tutorials spread across the internet, lies a world of challenges, logic, and smart thinking—
              a place where developers sharpen their skills through real problems and interactive learning.

              At Hesham Quizes, the questions aren’t just questions—
              they’re gateways to mastering programming through practical, fun, and engaging quizzes.
            </p>
            <button className="cta">know more</button>
          </article>

          <figure
            className="mainHeading__image"
            id="scene"
            ref={sceneRef}
          >
            <img
              data-depth="0.2"
              src={mainphoto}
              alt="main photo"
            />
          </figure>
        </div>
      </header>

      <main>
        <div className="cards-grid">
          {/* Card 1 */}
          <div
            className="card"
            onClick={() => onStart({ category: "Linux", limit: 10 })}
          >
            <div className="card-image">
              <img src={linuxImage} alt="linux" className="card-image" />
            </div>
            <div className="card-body">
              <div className="category">Linux</div>
              <div className="heading">
                Linux Quizzes is a simple, interactive way to test and improve
                your Linux skills. It covers essential commands, permissions,
                system tasks, and more—perfect for beginners, students, and IT
                professionals.
              </div>
              <div className="author">
                By <span className="name">Abi</span> 4 days ago
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="card"
            onClick={() => onStart({ category: "DevOps", limit: 10 })}
          >
            <div className="card-image">
              <img src={devopsImage} alt="DevOps" className="card-image" />
            </div>
            <div className="card-body">
              <div className="category">DevOps</div>
              <div className="heading">
                DevOps Quizzes is a quick and interactive way to test your
                knowledge of CI/CD, automation, cloud, Docker, Kubernetes,
                scripting, and monitoring—perfect for beginners and
                professionals improving their DevOps skills.
              </div>
              <div className="author">
                By <span className="name">Sarah</span> 2 days ago
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card">
            <div className="card-image">
              <img
                src={networkingImage}
                alt="Networking"
                className="card-image"
              />
            </div>
            <div className="card-body">
              <div className="category">Networking</div>
              <div className="heading">
                Networking Quizzes helps you quickly test and improve your
                knowledge of IP addressing, routing, switching, protocols,
                security, and troubleshooting—perfect for students and IT
                professionals.
              </div>
              <div className="author">Coming soon...</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card">
            <div className="card-image">
              <img
                src={ProgrammingImage}
                alt="Programming"
                className="card-image"
              />
            </div>
            <div className="card-body">
              <div className="category">Programming</div>
              <div className="heading">
                Programming Quizzes lets you test and sharpen your coding
                knowledge across languages, algorithms, data structures, and
                problem-solving—perfect for beginners, students, and developers.
              </div>
              <div className="author">Coming soon...</div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="card">
            <div className="card-image">
              <img src={cloudImage} alt="Cloud" className="card-image" />
            </div>
            <div className="card-body">
              <div className="category">Cloud</div>
              <div className="heading">
                Cloud Quizzes help you test and improve your knowledge of AWS,
                Azure, GCP, virtualization, cloud security, and DevOps
                tools—ideal for beginners and cloud professionals.
              </div>
              <div className="author">Coming soon...</div>
            </div>
          </div>

          {/* Card 6 */}
          <div
            className="card"
            onClick={() => onStart({ category: "Docker", limit: 10 })}
          >
            <div className="card-image">
              <img src={dockerImage} alt="Docker" className="card-image" />
            </div>
            <div className="card-body">
              <div className="category">Docker</div>
              <div className="heading">
                Docker Quizzes help you quickly test your knowledge of
                containers, images, Dockerfiles, networking, and
                orchestration—perfect for beginners and DevOps professionals.
              </div>
              <div className="author">
                By <span className="name">Sarah</span> 2 days ago
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="card">
            <div className="card-image">
              <img
                src={kubernetesImage}
                alt="Kubernetes"
                className="card-image"
              />
            </div>
            <div className="card-body">
              <div className="category">Kubernetes</div>
              <div className="heading">
                Kubernetes Quizzes let you test and improve your skills in pods,
                deployments, services, networking, and cluster
                management—ideal for DevOps engineers and cloud learners.
              </div>
              <div className="author">Coming soon...</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StartScreen;
