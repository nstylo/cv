import React, { useEffect, useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import i18next from "i18next";
import me from "./Me.jpeg";
import home from "./home.png";
import linkedin from "./linkedin.png";
import tel from "./tel.png";
import email from "./email.png";
import github from "./github.png";
import cv from "./cv.png";
import axios from "axios";

let MONTH_MAP = {};
i18next.on("languageChanged", () => {
  /* resources have been loaded */

  MONTH_MAP = {
    1: i18n.t("months.jan"),
    2: i18n.t("months.feb"),
    3: i18n.t("months.mar"),
    4: i18n.t("months.apr"),
    5: i18n.t("months.may"),
    6: i18n.t("months.jun"),
    7: i18n.t("months.jul"),
    8: i18n.t("months.aug"),
    9: i18n.t("months.sep"),
    10: i18n.t("months.oct"),
    11: i18n.t("months.nov"),
    12: i18n.t("months.dec"),
  };
});

const UL = styled.ul`
  margin-block-start: 0.2em;
  margin-block-end: 0.2em;
  padding-inline-start: 32px;
`;

const CVouter = styled.div`
  height: 29.7cm;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CVbody = styled.div`
  width: 210mm;
  color: #4d4d4d;
  font-size: 10px;
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
  font-size: 11px;
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
  padding: 16px 30px 10px 22px;
`;

const SectionHeader = styled.div`
  white-space: nowrap;
  font-family: "Roboto Condensed";
  font-weight: 500;
  font-size: 16px;
  font-weight: 600;
  color: #4d4d4d;
`;

const PositionDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  font-size: 10px;
  color: #4d4d4d;
  margin: 8px 0;
`;

const SectionItemLeft = styled.div`
  box-sizing: border-box;
  padding-right: 4mm;
  white-space: wrap;
  min-width: 40mm;
  width: 40mm;
  line-height: 1.4;
`;

const SectionItemRight = styled.div`
  width: 100%;
`;

const SectionItemHeader = styled.div`
  font-family: "Roboto Condensed";
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 2px;
`;

const SectionItemContent = styled.div`
  font-weight: 300;
  text-align: justify;
  font-size: 10px;
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

const Date = styled.p`
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

const SectionItem = ({
  entity,
  place,
  position,
  date,
  children,
  href,
  ...props
}) => {
  const { t } = useTranslation();

  // weird date transformation, definitly TODO
  let dateString = [];
  for (let i = 0; i < 2; i++) {
    const date_ = date[i];
    // you can use [] for the second date item, and it is assumed that the activity
    // has no end date -> until 'present'
    // or omit the second item and assume that activity has no range (only within one month)
    if (i === 1) {
      if (date_ instanceof Array && !date_.length) {
        dateString.push(t("present"));
        continue;
      } else if (!date_) {
        continue;
      }
    }
    const month = MONTH_MAP[date_[0]] || "";
    const year = date_[1];
    dateString.push((month ? month + " " : "") + year);
  }

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
        <PositionDate>
          <SectionItemHeader>{position}</SectionItemHeader>
          <Date>{dateString.join(" - ")}</Date>
        </PositionDate>
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
  font-size: 11px;
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

const SidebarLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Language = ({ text, level = 0 }) => {
  const { t } = useTranslation();

  let level_text;
  switch (level) {
    case 1:
      level_text = t("sidebar.language_subscript.basic");
      break;
    case 2:
      level_text = t("sidebar.language_subscript.intermediate");
      break;
    case 3:
      level_text = t("sidebar.language_subscript.fluent");
      break;
    case 4:
      level_text = t("sidebar.language_subscript.native");
      break;
    default:
      level_text = t("sidebar.language_subscript.basic");
  }

  return (
    <LanguageWrapper>
      <div
        style={{
          paddingLeft: 16,
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
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 8,
        }}
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
  const { t, i18n } = useTranslation();
  const telNr = "+4917641993319";

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get("lang");

    switch (lang) {
      case "en":
        i18n.changeLanguage(lang);
        break;
      case "de":
        i18n.changeLanguage(lang);
        break;
      default:
        i18n.changeLanguage("en");
    }
  }, []);

  return (
    <CVouter>
      <GlobalStyle />
      <CVbody>
        <Header>Niklas Stylianou</Header>
        <Container>
          <Sidebar>
            <SidebarSection style={{ margin: "8px 0 24px 0" }}>
              <Center>
                <Me />
              </Center>
            </SidebarSection>
            <SidebarSection>
              <SidebarHeader>{t("sidebar.header.contact")}</SidebarHeader>
              Lemförder Straße 5, 30169
              <br />
              Hannover, DE
              <br />
              <br />
              <div style={{ lineHeight: 2 }}>
                <SidebarLinkContainer>
                  <A
                    color="#21a021"
                    href={`tel:${telNr}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {telNr}
                  </A>
                  <img
                    src={tel}
                    alt="phone number"
                    style={{ width: 12, height: 12, marginLeft: 10 }}
                  />
                </SidebarLinkContainer>
                <SidebarLinkContainer>
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
                </SidebarLinkContainer>
                <SidebarLinkContainer>
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
                </SidebarLinkContainer>
                <SidebarLinkContainer>
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
                </SidebarLinkContainer>
                {
                  // <SidebarLinkContainer>
                  //   <A
                  //     color="#21a021"
                  //     href="https://homerow.dev"
                  //     target="_blank"
                  //     rel="noreferrer"
                  //   >
                  //     homerow.dev
                  //   </A>
                  //   <img
                  //     src={home}
                  //     alt="homepage"
                  //     style={{ width: 12, height: 12, marginLeft: 10 }}
                  //   />
                  // </SidebarLinkContainer>
                }
                <SidebarLinkContainer>
                  <A
                    color="#21a021"
                    href="https://nstylo.github.io/cv/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("sidebar.web_cv")}
                  </A>
                  <img
                    src={cv}
                    alt="cv"
                    style={{ width: 12, height: 12, marginLeft: 10 }}
                  />
                </SidebarLinkContainer>
              </div>
            </SidebarSection>
            <SidebarSection>
              <SidebarHeader>{t("sidebar.header.languages")}</SidebarHeader>
              {[
                { text: t("sidebar.languages.language1"), level: 4 },
                { text: t("sidebar.languages.language2"), level: 3 },
                { text: t("sidebar.languages.language3"), level: 1 },
              ].map((lang) => (
                <Language key={lang.text} text={lang.text} level={lang.level} />
              ))}
            </SidebarSection>
            <SidebarSection>
              <SidebarHeader>{t("sidebar.header.skillset")}</SidebarHeader>
              <Skillset>
                {[
                  {
                    text: "Python",
                    wikiText: "Python_(programming_language)",
                    wikiDisabled: false,
                  },
                  { text: "JavaScript", wikiText: "", wikiDisabled: false },
                  { text: "ReactJS", wikiText: "", wikiDisabled: false },
                  { text: "Linux", wikiText: "", wikiDisabled: false },
                  { text: "Git", wikiText: "", wikiDisabled: false },
                  { text: "PostgreSQL", wikiText: "", wikiDisabled: false },
                  {
                    text: "Java",
                    wikiText: "Java_(programming_language)",
                    wikiDisabled: false,
                  },
                  {
                    text: "Django",
                    wikiText: "Django_(web_framework)",
                    wikiDisabled: false,
                  },
                  { text: "HTML5", wikiText: "", wikiDisabled: false },
                  { text: "CSS", wikiText: "", wikiDisabled: false },
                  {
                    text: "NodeJS",
                    wikiText: "Node.js",
                    wikiDisabled: false,
                  },
                  {
                    text: "TypeScript",
                    wikiText: "",
                    wikiDisabled: false,
                  },
                  {
                    text: "Docker",
                    wikiText: "Docker_(software)",
                    wikiDisabled: false,
                  },
                  {
                    text: "Rust",
                    wikiText: "Rust_(programming_language)",
                    wikiDisabled: false,
                  },
                  {
                    text: "Haskell",
                    wikiText: "Haskell_(programming_language)",
                    wikiDisabled: false,
                  },
                  {
                    text: "C",
                    wikiText: "C_(programming_language)",
                    wikiDisabled: false,
                  },
                  { text: "C++14", wikiText: "C++", wikiDisabled: false },
                  {
                    text: "Bash",
                    wikiText: "Bash_(Unix_shell)",
                    wikiDisabled: false,
                  },
                  {
                    text: "Plutus",
                    wikiText: "",
                    wikiDisabled: true,
                  },
                  { text: "GraphQL", wikiText: "", wikiDisabled: false },
                  {
                    text: "Google Cloud Platform",
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
              <SidebarHeader>{t("sidebar.header.interests")}</SidebarHeader>
              <Hobbies>
                {[
                  t("sidebar.interests.interest1"),
                  t("sidebar.interests.interest2"),
                  t("sidebar.interests.interest3"),
                  t("sidebar.interests.interest4"),
                  t("sidebar.interests.interest5"),
                  t("sidebar.interests.interest6"),
                  t("sidebar.interests.interest7"),
                ].map((item) => (
                  <HobbyOuter key={item}>
                    <HobbyInner>{item}</HobbyInner>
                  </HobbyOuter>
                ))}
              </Hobbies>
            </SidebarSection>
          </Sidebar>
          <Content>
            <Section header={t("header.header1")}>
              <SectionItemContent>
                {t("personal_information")
                  .split("\n")
                  .map((c) => (
                    <p>{c}</p>
                  ))}
              </SectionItemContent>
            </Section>
            <Section header={t("header.header2")}>
              <SectionItem
                entity="Eindhoven University of Technology, NL"
                position="Bachelor of Science"
                date={[
                  [null, 2017],
                  [null, 2021],
                ]}
                href="https://www.tue.nl/en/"
              >
                Computer Science & Engineering
              </SectionItem>
              {
                // <SectionItem
                //   entity="RWTH Aachen, DE"
                //   position="Bachelor of Science"
                //   date="2015 - 2017"
                //   href="https://www.rwth-aachen.de/go/id/a/?lidx=1"
                // >
                //   Civil Engineering (discontinued)
                // </SectionItem>
              }
              <SectionItem
                entity="English Teaching College Wellington, NZ"
                position="CAE C1"
                date={[
                  [null, 2014],
                  [null, 2015],
                ]}
                href="https://www.etc.ac.nz/"
              >
                English
              </SectionItem>
              <SectionItem
                entity="Freiherr-vom-Stein Gymnasium, DE"
                date={[
                  [null, 2006],
                  [null, 2014],
                ]}
                position="Abitur"
                href="http://www.stein.kleve.de/"
              >
                A Level
              </SectionItem>
            </Section>
            <Section header={t("header.header3")}>
              <SectionItem
                entity="Code Yellow B.V."
                place="Eindhoven, NL"
                position={t("experience.job1.job_title")}
                date={[[8, 2020], []]}
                href="https://www.codeyellow.nl/"
              >
                <UL>
                  <li>{t("experience.job1.job_desc_1")}</li>
                  <li>{t("experience.job1.job_desc_2")}</li>
                  <li>{t("experience.job1.job_desc_3")}</li>
                  <li>{t("experience.job1.job_desc_4")}</li>
                </UL>
              </SectionItem>
              <SectionItem
                entity="Hable Accessibility"
                place="Eindhoven, NL"
                position={t("experience.job2.job_title")}
                date={[
                  [3, 2020],
                  [8, 2020],
                ]}
                href="https://www.iamhable.com/"
              >
                <UL>
                  <li>{t("experience.job2.job_desc_1")}</li>
                  <li>{t("experience.job2.job_desc_2")}</li>
                </UL>
              </SectionItem>
              <SectionItem
                entity="A Place For Now"
                place="Eindhoven, NL"
                position={t("experience.job3.job_title")}
                date={[
                  [3, 2020],
                  [11, 2020],
                ]}
                href="https://github.com/nstylo/aplacefornow.nl"
              >
                <UL>
                  <li>{t("experience.job3.job_desc_1")}</li>
                  <li>{t("experience.job3.job_desc_2")}</li>
                  <li>{t("experience.job3.job_desc_3")}</li>
                </UL>
              </SectionItem>
              <SectionItem
                entity="Code Product Solutions B.V."
                place="Eindhoven, NL"
                position={t("experience.job4.job_title")}
                date={[
                  [7, 2019],
                  [8, 2019],
                ]}
                href="https://www.code-ps.com/"
              >
                <UL>
                  <li>{t("experience.job4.job_desc_1")}</li>
                  <li>{t("experience.job4.job_desc_2")}</li>
                </UL>
              </SectionItem>
              {/*<SectionItem
                entity="INNSIDE Aachen"
                place="Aachen, DE"
                position="Commis de Rang & Barkeeper"
                date="March 2017 - August 2017"
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
                position="Commis de Rang"
                date="November 2014 - March 2015"
                href="https://www.rydges.com/accommodation/new-zealand/the-thorndon-hotel-wellington/"
              ></SectionItem>*/}
            </Section>
            <Section header={t("header.header4")}>
              <SectionItem
                entity="Eindhoven University of Technology"
                place="Eindhoven, NL"
                position={t("internships.job1.job_title")}
                date={[
                  [9, 2018],
                  [11, 2019],
                ]}
                href="https://www.tue.nl/en/"
              >
                {t("internships.job1.job_desc_1")}
                <br />
                <UL>
                  <li>{t("internships.job1.job_desc_2")}</li>
                </UL>
              </SectionItem>
              <SectionItem
                entity="Nestlé Purina"
                place="Euskirchen, DE"
                position={t("internships.job2.job_title")}
                date={[
                  [10, 2013],
                  [11, 2013],
                ]}
                href="https://www.purina.com/"
              >
                <UL>
                  <li>{t("internships.job2.job_desc_1")}</li>
                </UL>
              </SectionItem>
              <SectionItem
                entity="Evonik Industries"
                place="Krefeld, DE"
                position={t("internships.job3.job_title")}
                date={[
                  [6, 2012],
                  [7, 2012],
                ]}
                href="https://corporate.evonik.com/en"
              >
                <UL>
                  <li>{t("internships.job3.job_desc_1")}</li>
                  <li>{t("internships.job3.job_desc_2")}</li>
                </UL>
              </SectionItem>
            </Section>
            <Section header={t("header.header5")}>
              <SectionItem
                entity="Massey University"
                place="Wellingtion, NZ"
                position={t("certifications.cert1.cert_title")}
                date={[[12, 2014]]}
                href="https://www.massey.ac.nz/"
              >
                {t("certifications.cert1.cert_desc_1")}
              </SectionItem>
              <SectionItem
                entity="Input Output (IOHK)"
                position={t("certifications.cert2.cert_title")}
                place={t("certifications.cert2.cert_sub_title")}
                date={[[7, 2021], []]}
                href="https://developers.cardano.org/en/plutus-pioneer-program/"
              >
                {t("certifications.cert2.cert_desc_1")}
              </SectionItem>
            </Section>
          </Content>
        </Container>
      </CVbody>
    </CVouter>
  );
}

export default CV;
