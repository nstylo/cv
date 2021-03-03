import React, { useEffect, useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import me from "./Me.jpeg";
import home from "./home.png";
import linkedin from "./linkedin.png";
import tel from "./tel.png";
import email from "./email.png";
import github from "./github.png";
import axios from "axios";

const UL = styled.ul`
  margin-block-start: 0.2em;
  margin-block-end: 0.2em;
  padding-inline-start: 32px;
`;

const CVouter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CVbody = styled.div`
  width: 210mm;
  color: #4d4d4d;
  font-size: 11px;
  background-color: white;
  overflow: hidden;
  padding-bottom: 28px;

  @media screen {
    margin: 20px 0;
    box-shadow: 0px 0px 8px 6px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.div`
  z-index: 3;
  line-height: 1.3;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 40px;
  background-color: #21a021;
  color: white;
  padding-bottom: 4px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Sidebar = styled.aside`
  width: 65mm;
  height: 100%;
  background-color: #f2f2f2;
  padding: 12px;
  font-size: 12px;
  text-align: right;
  box-sizing: border-box;
`;

const SidebarHeader = styled.div`
  color: #4d4d4d;
  font-family: "Roboto Condensed";
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`;

const SidebarSection = styled.div`
  margin: 20px 0;
`;

const Content = styled.main`
  width: 100%;
  padding: 10px 42px 10px 22px;
`;

const SectionHeader = styled.div`
  white-space: nowrap;
  font-family: "Roboto Condensed";
  font-weight: 500;
  font-size: 18px;
  font-weight: 600;
  color: #4d4d4d;
`;

const HR = styled.div`
  flex-grow: 1;
  width: 100%;
  margin: 0px;
  margin-left: 6px;
  margin-bottom: 6px;
  border: 0px;
  border-bottom: 1.5px solid #ccc;
`;

const SectionItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  color: #4d4d4d;
  margin: 10px 0;
`;

const SectionItemLeft = styled.div`
  box-sizing: border-box;
  padding-right: 4mm;
  white-space: wrap;
  min-width: 40mm;
  width: 40mm;
  line-height: 1.4;
`;

const SectionItemRight = styled.div``;

const SectionItemHeader = styled.div`
  font-family: "Roboto Condensed";
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
`;

const SectionItemContent = styled.div`
  font-weight: 300;
  text-align: justify;
  font-size: 12px;
`;

const Company = styled.p`
  margin: 0;
  font-weight: 300;
  font-family: "Roboto";
`;

const Place = styled.p`
  font-weight: 300;
  color: #aaa;
  margin: 0;
  font-family: "Roboto";
  font-size: 10px;
  margin-top: 2px;
`;

const Me = styled.div`
  background: url(${me}) no-repeat;
  background-size: cover;
  border-radius: 50%;
  width: 36mm;
  height: 36mm;
  background-position: 0mm -2mm;
`;

const SectionItem = ({ entity, place, position, children, href, ...props }) => {
  return (
    <SectionItemWrapper {...props}>
      <SectionItemLeft>
        <Company>
          <A href={href} target="blank_" color="#4d4d4d">
            {entity}
          </A>
        </Company>
        <Place>{place}</Place>
      </SectionItemLeft>
      <SectionItemRight>
        <SectionItemHeader>{position}</SectionItemHeader>
        <SectionItemContent>{children}</SectionItemContent>
      </SectionItemRight>
    </SectionItemWrapper>
  );
};

const Skillset = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ToolTipHeader = styled.div`
  font-size: 20px;
  font-family: "Roboto Condensed";
  font-weight: 600;
  margin-bottom: 10px;
`;

const ToolTip = styled.div`
  display: ${(props) => (props.isShown ? "block" : "none")};
  text-align: left;
  position: absolute;
  font-size: 12px;
  z-index: 10;
  width: 400px;
  min-height: 80px;
  padding: 20px;
  background: white;
  box-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.3);
  left: calc(100% + 10px);
  animation: ${(props) => (props.isShown ? fadeIn : fadeOut)} 0.5s ease;
`;

const SkillInner = styled.div`
  font-weight: 300;
  font-size: 12px;
  padding: 2px 6px;
  white-space: nowrap;
  pointer-events: none;
`;

const bordercolor_enabled = keyframes`
  from {
    border: 0.1pt solid #aaa;
  }
  to {
    border: 1.5px solid #21a021;
  }
`;

const bordercolor_disabled = keyframes`
  from {
    border: 0.1pt solid #aaa;
  }
  to {
    border: 1.5px solid #aaa;
  }
`;

const SkillOuter = styled.a`
  color: inherit;
  text-decoration: none;
  box-sizing: border-box;
  background-color: white;
  margin: 0 4px 4px 0;
  border: 0.1pt solid #aaa;
  border-radius: 5px;
  position: relative;

  &:hover {
    cursor: help;
    border: 0.1pt solid transparent;

    &:before {
      animation: ${(props) =>
          props.TooltipDisabled ? bordercolor_disabled : bordercolor_enabled}
        0.15s ease;
      border: 1.5px solid
        ${(props) => (props.TooltipDisabled ? "#aaa" : "#21a021")};
    }
  }

  &:before {
    border-radius: 5px;
    content: " ";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1.5px solid transparent;
  }
`;

const Skill = ({ wikiText, wikiDisabled, text, ...props }) => {
  const [tooltip, setTooltip] = useState("");
  const [title, setTitle] = useState("");
  const [isShown, setIsShown] = useState(false);

  if (!wikiText) wikiText = text;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?origin=*&format=json&formatversion=2&action=query&prop=extracts&exintro&exchars=200&exlimit=1&explaintext&redirects=1&titles=${encodeURIComponent(
          wikiText
        )}`
      );

      if (response.status === 200) {
        setTooltip(response.data.query.pages[0].extract);
        setTitle(response.data.query.pages[0].title);
      } else {
        // do something?
      }
    };

    fetchApi();
  }, [wikiText]);

  return (
    <SkillOuter
      // TODO: links are not disabled on print, they route to my cv
      href={
        wikiDisabled ? "/" : `https://en.wikipedia.org/wiki/${wikiText || text}`
      }
      onClick={(e) => wikiDisabled && e.preventDefault()}
      aria-disabled={!!wikiDisabled}
      target="_blank"
      TooltipDisabled={wikiDisabled}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {wikiDisabled ? null : (
        <ToolTip isShown={isShown}>
          <ToolTipHeader>{title}</ToolTipHeader>
          {tooltip}
        </ToolTip>
      )}
      <SkillInner>{text}</SkillInner>
    </SkillOuter>
  );
};

const Bubble = styled.div`
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 3px;
  background-color: ${(props) => (props.active === true ? "#21a021" : "#ccc")};
`;

const Hobbies = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const HobbyOuter = styled.a`
  color: inherit;
  text-decoration: none;
  box-sizing: border-box;
  background-color: white;
  margin: 0 4px 4px 0;
  border: 0.1pt solid #aaa;
  border-radius: 5px;
  position: relative;
`;

const HobbyInner = styled.div`
  font-weight: 300;
  font-size: 12px;
  padding: 2px 6px;
  white-space: nowrap;
`;

const LanguageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font: "Roboto Condensed";
  padding: 4px 0;
`;

const A = styled.a`
  text-decoration: none;
  border-bottom: 1px solid transparent;
  color: ${(props) => props.color};
  -webkit-transition: border 500ms ease;
  -moz-transition: border 500ms ease;
  -ms-transition: border 500ms ease;
  -o-transition: border 500ms ease;
  transition: border 500ms ease;

  &:hover {
    text-decoration: none;
    border-bottom: 1px solid ${(props) => props.color}dd;
  }
`;

const Language = ({ text, level = 0 }) => {
  let level_text;
  switch (level) {
    case 1:
      level_text = "basic";
      break;
    case 2:
      level_text = "keine ahnung";
      break;
    case 3:
      level_text = "fluent";
      break;
    case 4:
      level_text = "native";
      break;
    default:
      level_text = "keine ahnung";
  }

  return (
    <LanguageWrapper>
      <div
        style={{
          paddingLeft: 24,
          fontFamily: "Roboto Condensed",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {text}
        <span
          style={{
            paddingLeft: 4,
            fontFamily: "Roboto Condensed",
            fontSize: 10,
            fontWeight: 500,
            color: "#999",
          }}
        >
          ({level_text})
        </span>
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {Array(4)
          .fill()
          .map((_, i) => (
            <Bubble active={i + 1 <= level} />
          ))}
      </div>
    </LanguageWrapper>
  );
};

const Section = ({ header, children, ...props }) => {
  return (
    <div>
      <div style={{ display: "flex", width: "100%", margin: "10px 0" }}>
        <SectionHeader>{header}</SectionHeader>
        <HR />
      </div>
      {children}
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  @media screen {
    html {
      background-color: #444;
    }
  }

  a {
    color: #21a021;
  }
`;

function CV() {
  return (
    <CVouter>
      <GlobalStyle />
      <CVbody>
        <Header>Niklas Stylianou</Header>
        <Container>
          <Sidebar>
            <SidebarSection style={{ margin: "32px 0 36px 0" }}>
              <Center>
                <Me />
              </Center>
            </SidebarSection>
            <SidebarSection>
              <SidebarHeader>Contact</SidebarHeader>
              Achilleslaan 21, 5631BS
              <br />
              Eindhoven, NL
              <br />
              <br />
              <div style={{ lineHeight: 2 }}>
                <div>
                  <A
                    color="#21a021"
                    href="tel:+31682220490"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +31 6 82220490
                  </A>
                  <img
                    src={tel}
                    alt="phone number"
                    style={{ width: 12, height: 12, marginLeft: 10 }}
                  />
                </div>
                <div>
                  <A
                    color="#21a021"
                    href="mailto:niklas@stylianou.info"
                    target="_blank"
                    rel="noreferrer"
                  >
                    niklas@stylianou.info
                  </A>
                  <img
                    src={email}
                    alt="email"
                    style={{ width: 12, height: 12, marginLeft: 10 }}
                  />
                </div>
                <div>
                  <A
                    color="#21a021"
                    href="https://github.com/nstylo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    nstylo
                  </A>
                  <img
                    src={github}
                    alt="github"
                    style={{ width: 12, height: 12, marginLeft: 10 }}
                  />
                </div>
                <div>
                  <A
                    color="#21a021"
                    href="https://linkedin.com/in/niklas-stylianou"
                    target="_blank"
                    rel="noreferrer"
                  >
                    niklas-stylianou
                  </A>
                  <img
                    src={linkedin}
                    alt="linkedin"
                    style={{ width: 12, height: 12, marginLeft: 10 }}
                  />
                </div>
                <div>
                  <A
                    color="#21a021"
                    href="https://homerow.dev"
                    target="_blank"
                    rel="noreferrer"
                  >
                    homerow.dev
                  </A>
                  <img
                    src={home}
                    alt="homepage"
                    style={{ width: 12, height: 12, marginLeft: 10 }}
                  />
                </div>
              </div>
            </SidebarSection>
            <SidebarSection>
              <SidebarHeader>Languages</SidebarHeader>
              {[
                { text: "German", level: 4 },
                { text: "English", level: 3 },
                { text: "Dutch", level: 1 },
              ].map((lang) => (
                <Language key={lang.text} text={lang.text} level={lang.level} />
              ))}
            </SidebarSection>
            <SidebarSection>
              <SidebarHeader>Skillset</SidebarHeader>
              <Skillset>
                {[
                  { text: "JavaScript", wikiText: "", wikiDisabled: false },
                  { text: "ReactJS", wikiText: "", wikiDisabled: false },
                  { text: "Linux", wikiText: "", wikiDisabled: false },
                  { text: "Git", wikiText: "", wikiDisabled: false },
                  {
                    text: "Python",
                    wikiText: "Python_(programming_language)",
                    wikiDisabled: false,
                  },
                  { text: "PostgreSQL", wikiText: "", wikiDisabled: false },
                  {
                    text: "Django",
                    wikiText: "Django_(web_framework)",
                    wikiDisabled: false,
                  },
                  { text: "HTML5", wikiText: "", wikiDisabled: false },
                  { text: "CSS", wikiText: "", wikiDisabled: false },
                  {
                    text: "Bash",
                    wikiText: "Bash_(Unix_shell)",
                    wikiDisabled: false,
                  },
                  { text: "SQL", wikiText: "", wikiDisabled: false },
                  {
                    text: "Docker",
                    wikiText: "Docker_(software)",
                    wikiDisabled: false,
                  },
                  {
                    text: "Java",
                    wikiText: "Java_(programming_language)",
                    wikiDisabled: false,
                  },
                  {
                    text: "C",
                    wikiText: "C_(programming_language)",
                    wikiDisabled: false,
                  },
                  { text: "C++14", wikiText: "C++", wikiDisabled: false },
                  { text: "NodeJS", wikiText: "Node.js", wikiDisabled: false },
                  { text: "GraphQL", wikiText: "", wikiDisabled: false },
                  {
                    text: "TypeScript",
                    wikiText: "",
                    wikiDisabled: false,
                  },
                  // {
                  //   text: "styled-components",
                  //   wikiText: "",
                  //   wikiDisabled: true,
                  // },
                  // { text: "Material-UI", wikiText: "", wikiDisabled: true },
                  // { text: "GatsbyJS", wikiText: "", wikiDisabled: true },
                  {
                    text: "Google Cloud",
                    wikiText: "",
                    wikiDisabled: false,
                  },
                  {
                    text: "Scrum",
                    wikiText: "Scrum_(software_development)",
                    wikiDisabled: false,
                  },
                ].map((item) => (
                  <Skill
                    key={item.text}
                    text={item.text}
                    wikiText={item.wikiText}
                    wikiDisabled={item.wikiDisabled}
                  />
                ))}
              </Skillset>
            </SidebarSection>
            <SidebarSection>
              <SidebarHeader>Interests</SidebarHeader>
              <Hobbies>
                {[
                  "Cooking",
                  "Sketching",
                  "Playing Guitar",
                  "Financial Economics",
                  "Cryptocurrency",
                  "Chess",
                ].map((item) => (
                  <HobbyOuter>
                    <HobbyInner>{item}</HobbyInner>
                  </HobbyOuter>
                ))}
              </Hobbies>
            </SidebarSection>
          </Sidebar>
          <Content>
            <Section header="Education">
              <SectionItem
                entity="Eindhoven University of Technology, NL"
                place="2017-2021"
                position="Bachelor of Science"
                href="https://www.tue.nl/en/"
              >
                Computer Science & Engineering
              </SectionItem>
              <SectionItem
                entity="RWTH Aachen, DE"
                place="2015-2017"
                position="Bachelor of Science"
                href="https://www.rwth-aachen.de/go/id/a/?lidx=1"
              >
                Civil Engineering (discontinued)
              </SectionItem>
              <SectionItem
                entity="English Teaching College Wellington, NZ"
                place="2014-2015"
                position="CAE C1"
                href="https://www.etc.ac.nz/"
              >
                English
              </SectionItem>
              <SectionItem
                entity="Freiherr-vom-Stein Gymnasium, DE"
                place="2006-2014"
                position="Abitur"
                href="http://www.stein.kleve.de/"
              >
                A Level
              </SectionItem>
            </Section>
            <Section header="Professional Experience">
              <SectionItem
                entity="Code Yellow B.V."
                place="Eindhoven, NL"
                position="Fullstack Software Engineer"
                href="https://www.codeyellow.nl/"
              >
                <UL>
                  <li>
                    Developing custom business software using ReactJS with MobX,
                    Django and PostgreSQL.
                  </li>
                  <li>Designing and implementing application modules.</li>
                  <li>
                    Interacting directly with customers and translating their
                    needs into software solutions.
                  </li>
                </UL>
              </SectionItem>
              <SectionItem
                entity="A Place For Now"
                place="Eindhoven, NL"
                position="Lead Frontend Developer"
                href="https://github.com/nstylo/aplacefornow.nl"
              >
                <UL>
                  <li>
                    Implementing a modern web application using ReactJS and
                    MaterialUI.
                  </li>
                  <li>
                    Responsible for Continuous Integration on Google Cloud using
                    Docker.
                  </li>
                  <li>Git for version control.</li>
                </UL>
              </SectionItem>
              <SectionItem
                entity="Hable Accessibility"
                place="Eindhoven, NL"
                position="Software Engineer"
                href="https://www.iamhable.com/"
              >
                <UL>
                  <li>
                    Developing a source code transpiler in Python which converts
                    a custom Braille mapping language into C++ source code.
                  </li>
                </UL>
              </SectionItem>
              <SectionItem
                entity="Code Product Solutions B.V."
                place="Eindhoven, NL"
                position="Frontend Developer"
                href="https://www.code-ps.com/office/id11603/eindhoven/"
              >
                <UL>
                  <li>
                    Developing an interface for customers using ReactJS and REST
                    API which automates simulation processes.
                  </li>
                  <li>Workflow via GitLab CI.</li>
                  <li>Testing with Jest.</li>
                </UL>
              </SectionItem>
              {/*<SectionItem
                entity="INNSIDE Aachen"
                place="Aachen, DE"
                position="Commis de Rang & Barkeeper"
                href="https://www.melia.com/en/hotels/germany/aachen/innside-aachen/index.htm"
              >
                <UL>
                  <li>
                    Serving and customer relations in Germany and New Zealand.
                  </li>
                </UL>
              </SectionItem>
              <SectionItem
                style={{ marginTop: "-10px" }}
                entity="The Thorndon Hotel"
                place="Wellington, NZ"
                position=""
                href="https://www.rydges.com/accommodation/new-zealand/the-thorndon-hotel-wellington/"
              ></SectionItem>*/}
            </Section>
            <Section header="Internships & Non-Professional Experience">
              <SectionItem
                entity="Eindhoven University of Technology"
                place="Eindhoven, NL"
                position="Student Assistant"
                href="https://www.tue.nl/en/"
              >
                Student assistant for five courses.
                <br />
                <UL>
                  <li>
                    Java Progrmming, Discrete Structures, Data Structures, Human
                    Technology Interaction & Webtech, Logic & Set Theory
                  </li>
                </UL>
                {/*<UL>
                  <li>Java Programming</li>
                  <li>Discrete Structures</li>
                  <li>Data Structures</li>
                  <li>Human Technology Interaction & Webtech</li>
                  <li>Logic & Set Theory</li>
                </UL>*/}
              </SectionItem>
              <SectionItem
                entity="Nestlé Purina"
                place="Euskirchen, DE"
                position="Intern Marketing & Sales"
                href="https://www.purina.com/"
              >
                <UL>
                  <li>Social media analysis on competitor products.</li>
                </UL>
              </SectionItem>
              <SectionItem
                entity="Evonik Industries"
                place="Krefeld, DE"
                position="Intern IT Administration"
                href="https://www.purina.com/"
              >
                <UL>
                  <li>Support for software and hardware issues.</li>
                  <li>Installing new hardware for employees.</li>
                </UL>
              </SectionItem>
            </Section>
            <Section header="Licenses & Certifications">
              <SectionItem
                entity="Massey University"
                place="Wellingtion, NZ"
                position="Cambridge English Level 2 Certificate"
                href="https://www.massey.ac.nz/"
              >
                Credential ID: 0047776898
              </SectionItem>
            </Section>
            <Section header="Personal Information">
              <SectionItemContent>
                I am a problem solver, fueled by curiosity and a passion for
                learning new things. My goal is to leverage my creativity and
                skill set in computer science to help solve complex real-world
                problems.
                <br />I am committed to expanding my skills as a software
                developer and therefore I devote considerable time to
                experimenting with modern web-frameworks, functional
                programming, and systems programming languages. My specific
                areas of interest include the Linux operating system, open
                source software, and blockchain technology.
                {/*
                I am a very inquisitive person
                by nature. Spending time on learning new things gives me
                pleasure and a feeling of accomplishment. Learning Computer
                Science empowered me with a potent toolset for solving complex
                and creative problems. I see computers and the programming of
                such as a huge sandbox environment with sheer endless
                opportunity to create.
                */}
                {/* As a kid I loved designing my own board- and card-games and as a
                teenager I started to modify computer games. Back then I
                perceived computer programming as some sort of wizardry, which
                  is why I value the power I am given now even more.
                I spend a significant amount of my current spare time on
                working with modern web-frameworks like ReactJS, learning
                systems languages like C/C++ as well as delving into functional
                programming using Haskell. Furthermore I maintain a special
                interest in the Linux operating system as well as other free and
                open source software, which enable me to be a more effective
                software developer.
                Programming is a tool and is used as a means for solving a
                subset of problems. Therefore, it is my ambition to learn a
                multitude of various skills which in turn give me the ability to
                integrate diverse knowledge into the process of solving
                problems.
                My other interests comprise of playing and listening to music,
                drawing, reading, adventurous traveling and cooking.
                When I am not immersed in one of my hobbies I enjoy spending time with
                  Family, Friends and meeting new people.*/}
              </SectionItemContent>
            </Section>
          </Content>
        </Container>
      </CVbody>
    </CVouter>
  );
}

export default CV;
