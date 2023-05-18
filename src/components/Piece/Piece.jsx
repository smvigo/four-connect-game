import style from './Piece.module.css'

const Piece = ({ fillPlayer }) => {
  const getColorByFillPlayer = fill_player => {
    if (fill_player == 0) return 'rgb(var(--playerZeroColor))'
    if (fill_player == 1) return 'rgb(var(--playerOneColor))'
    return ''
  }

  return (
    <div className={style['piece']}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="128"
          cy="128"
          r="104"
          fill={getColorByFillPlayer(fillPlayer)}
        />
        <circle
          cx="128"
          cy="128"
          r="104"
          fill="url(#paint0_linear_17_4940)"
          fillOpacity="0.4"
        />
        <g filter="url(#filter0_d_17_4940)">
          <circle
            cx="128"
            cy="128"
            r="80"
            fill={getColorByFillPlayer(fillPlayer)}
          />
          <circle
            cx="128"
            cy="128"
            r="80"
            fill="url(#paint1_linear_17_4940)"
            fillOpacity="0.3"
          />
          <circle
            cx="128"
            cy="128"
            r="80"
            fill="url(#paint2_linear_17_4940)"
            fillOpacity="0.5"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_17_4940"
            x="38"
            y="42"
            width="176"
            height="176"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-2" dy="2" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_17_4940"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_17_4940"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_17_4940"
            x1="128"
            y1="128"
            x2="232"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_17_4940"
            x1="208"
            y1="48"
            x2="48"
            y2="208"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.5625" stopColor="white" stopOpacity="0" />
            <stop offset="0.6875" stopColor="white" stopOpacity="0.75" />
            <stop offset="0.8125" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_17_4940"
            x1="128"
            y1="128"
            x2="208"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Piece
