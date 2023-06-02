export const setCellstyle = (revealed, value, x, y) => {
    return {
        background: revealed ? 
            value === "X" ? randomMineColor() : bombChexPattern(x, y)
            : chexPattern(x, y),
        color: numColorCode(value)
}};

const randomMineColor = () => {
    const colors = ["orange", "deeppink", "green", "cyan", "violet", "yellow"];
    return colors[Math.floor(Math.random() * colors.length)];
};

const bombChexPattern = (x, y) => {
    if ((x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0)) {
      return "#e5c29f";
    } else {
      return "#d7b899";
    }
};

const chexPattern = (x, y) => {
    if ((x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0)) {
      return "#aad751";
    } else {
      return "#a2d249";
    }
};

const numColorCode = (num) => {
    switch (num) {
        case 1:
            return "#1976d2";
        case 2:
            return "#388d3c";
        case 3:
            return "#d33030";
        case 4:
            return "#7c21a2";
        case 5:
            return "#1976d2";
        case 6:
            return "#1976d2";
        default:
            return "white";
    }
};