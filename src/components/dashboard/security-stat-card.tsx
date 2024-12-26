"use client";

import {
  FaCheck as Check,
  FaXmark as XMark,
  FaCircleExclamation as Unknown,
} from "react-icons/fa6";

type Props = {
  title: string;
  value: string;
};

const SecurityStatCard = ({ title, value }: Props) => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-[12px]">{title}</p>
        {value.length ? (
          <>
            {value === "1" ? (
              <>
                <Check className="text-blue-300" size="1rem" />
              </>
            ) : (
              <>
                <XMark className="text-blue-300" size="1rem" />
              </>
            )}
          </>
        ) : (
          <>
            <Unknown className="text-blue-300" size="1rem" />
          </>
        )}
      </div>
    </>
  );
};

export default SecurityStatCard;
