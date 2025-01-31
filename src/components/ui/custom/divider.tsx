interface DividerProps {
  height?: number;
}

const Divider = ({ height = 64 }: DividerProps) => {
  return <div style={{ height: `${height}px` }}></div>;
};

export default Divider;
