import React from "react";
import "./StartScreen.css";
import linuxImage from "../image/linux.jpg";
import devopsImage from "../image/devops.png";
import networkingImage from "../image/networking.png";
import ProgrammingImage from "../image/programing.jpg";
import cloudImage from "../image/Cloud.png";
import dockerImage from "../image/Docker.png";
import kubernetesImage from "../image/Kubernetes.png";

function StartScreen({ onStart }) {
  return (
    <div>
      <header className="hero-header">
        <h1>Hesham's Quizzes</h1>
        <small>Powered by quizapi.io</small>
      </header>

      <main>
        <div className="cards-grid">

          {/* Card 1 */}
          <div className="card" onClick={() => onStart({ category: "Linux", limit: 10 })}>
            <div className="card-image"><img src={linuxImage} alt="linux" className="card-image"/></div>
            <div className="card-body">
              <div className="category">Linux</div>
              <div className="heading">Linux Quizzes is a simple, interactive way to test and improve your Linux skills. It covers essential commands, permissions, system tasks, and more—perfect for beginners, students, and IT professionals.</div>
              <div className="author">
                By <span className="name">Abi</span> 4 days ago
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card" onClick={() => onStart({ category: "DevOps", limit: 10 })}>
            <div className="card-image"><img src={devopsImage} alt="DevOps" className="card-image"/></div>
            <div className="card-body">
              <div className="category">DevOps</div>
              <div className="heading">DevOps Quizzes is a quick and interactive way to test your knowledge of CI/CD, automation, cloud, Docker, Kubernetes, scripting, and monitoring—perfect for beginners and professionals improving their DevOps skills.</div>
              <div className="author">
                By <span className="name">Sarah</span> 2 days ago
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card">
            <div className="card-image"><img src={networkingImage} alt="Networking" className="card-image"/></div>
            <div className="card-body">
              <div className="category">Networking</div>
              <div className="heading">Networking Quizzes helps you quickly test and improve your knowledge of IP addressing, routing, switching, protocols, security, and troubleshooting—perfect for students and IT professionals.</div>
              <div className="author">
                Coming soon...
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card">
            <div className="card-image"><img src={ProgrammingImage} alt="Programming" className="card-image"/></div>
            <div className="card-body">
              <div className="category">Programming</div>
              <div className="heading">Programming Quizzes lets you test and sharpen your coding knowledge across languages, algorithms, data structures, and problem-solving—perfect for beginners, students, and developers.</div>
              <div className="author">
                Coming soon...
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="card">
            <div className="card-image"><img src={cloudImage} alt="Cloud" className="card-image"/></div>
            <div className="card-body">
              <div className="category">Cloud</div>
              <div className="heading">Cloud Quizzes help you test and improve your knowledge of AWS, Azure, GCP, virtualization, cloud security, and DevOps tools—ideal for beginners and cloud professionals.</div>
              <div className="author">
                Coming soon...
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="card" onClick={() => onStart({ category: "Docker", limit: 10 })}>
            <div className="card-image"><img src={dockerImage} alt="Docker" className="card-image"/></div>
            <div className="card-body">
              <div className="category">Docker</div>
              <div className="heading">Docker Quizzes help you quickly test your knowledge of containers, images, Dockerfiles, networking, and orchestration—perfect for beginners and DevOps professionals.</div>
              <div className="author">
                By <span className="name">Sarah</span> 2 days ago
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="card">
            <div className="card-image"><img src={kubernetesImage} alt="Kubernetes" className="card-image"/></div>
            <div className="card-body">
              <div className="category">Kubernetes</div>
              <div className="heading">Kubernetes Quizzes let you test and improve your skills in pods, deployments, services, networking, and cluster management—ideal for DevOps engineers and cloud learners.</div>
              <div className="author">
                Coming soon...
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default StartScreen;
