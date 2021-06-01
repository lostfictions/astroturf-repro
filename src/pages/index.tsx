import { css } from "astroturf";

const dashAnim = css`
  stroke-dasharray: 5;
  animation: dashdraw 0.5s linear infinite;

  @keyframes dashdraw {
    from {
      stroke-dashoffset: 10;
    }
  }
`;

const noTouch = css`
  touch-action: none;
`;

const blob = css`
  filter: url("#blob");
`;

const Index = () => {
  const x1 = 150;
  const y1 = 76;
  const x2 = 300;
  const y2 = 300;

  return (
    <div className="flex flex-row items-center">
      <svg
        viewBox={`0 0 500 500`}
        className={`m-10 border border-black ${noTouch} ${blob}`}
        width={500}
        height={500}
      >
        <circle cx={x1} cy={y1} r="40" />
        <circle cx={x2} cy={y2} r="40" />
        <path
          d={`M ${x1} ${y1} L ${x2} ${y2}`}
          className={dashAnim}
          strokeDasharray={5}
          strokeWidth={5}
          stroke="black"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Index;
