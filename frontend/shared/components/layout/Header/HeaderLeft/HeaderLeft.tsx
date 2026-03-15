import Navigation from "@/shared/components/navigation/Navigation";
import HeaderLogo from "@/shared/components/layout/Header/HeaderLeft/HeaderLogo";

export default function HeaderLeft(): React.ReactElement {
    return (
        <div className="flex gap-10">
            <HeaderLogo />
            <Navigation />
        </div>
    );
}