import { useRouter } from "next/router";
import React from "react";
import { CharacterType } from "../../types/changes";
import CopyToClipboard from "./CopyToClipboard";
import Move from "./Move";
import { Heading, Content } from "react-bulma-components";

const iconMap = {
  "Costumes & Aesthetics": "stickers",
  "Misc": "smash",
  "Stages": "stages"
};

interface CharacterProps {
  version: string
  data: CharacterType
  siteUrl: string
}

export default function Character({ data: { name, moves }, version, siteUrl }: CharacterProps) {
  const [show, setShow] = React.useState(false);

  const hyphenName = name.replace(/\s/gi, "-");
  const icon = iconMap[hyphenName] ? `icons/${iconMap[hyphenName]}` : `characters/${hyphenName}`;

  const content = moves.map(([move], index) =>
    <Move key={index} data={move}/>
  );

  function toggleShow() {
    setShow(!show);
  }

  const router = useRouter();
  const pageName = router.pathname.split("/")[1]; // should always be "changes"
  const link = encodeURI(`${siteUrl}/${pageName}/${version}#${name}`);

  return (
    <div key={name}>
      <Heading size={4} className="is-flex is-align-content-center mt-5">
        {/* <Image size={64} src={`/images/${icon}.png`}/> */}
        <img src={`/images/${icon}.png`}/>
        <a onClick={toggleShow} className={`dropdown-toggle ${show ? "open" : ""}`}>{name}</a>
        <CopyToClipboard link={link}/>
      </Heading>
      <Content style={{
        display: show ? "block" : "none"
      }}>
        {content}
      </Content>

      <style jsx>{`
        img {
          margin-right: 7px;
          height: 40px;
        }

        .dropdown-toggle {
          user-select: none;
          line-height: 39px;
        }

        .dropdown-toggle::before {
          content: "►";
          margin-right: 0.5rem;
          font-family: Arial;
        }

        .dropdown-toggle.open::before {
          content: "▼"
        }
      `}</style>
    </div>
  );
}