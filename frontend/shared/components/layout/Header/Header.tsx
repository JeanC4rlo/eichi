import HeaderLeft from "@/shared/components/layout/Header/HeaderLeft/HeaderLeft"
import HeaderRight from "@/shared/components/layout/Header/HeaderRight/HeaderRight"

export default function Header(): React.ReactElement {
    return (
        <header className="flex justify-between items-center px-[10vw] py-4 shadow-lg relative z-1">
            <HeaderLeft />
            <HeaderRight />
        </header>
    );
}