import CloseIcon from "../icons/close";

interface Props {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

const PopUp = ({ open, close, children }: Props) => {
  return (
    <div
      className={`transition-all duration-400 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      } z-10 absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center`}
    >
      <div className="bg-white rounded-md relative">
        <CloseIcon
          className="absolute top-1 right-1 h-6 w-6 text-gray-400 hover:text-gray-500 cursor-pointer transition-colors"
          onClick={close}
        />
        {children}
      </div>
    </div>
  );
};

export default PopUp;
