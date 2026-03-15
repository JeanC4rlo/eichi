import { navItemsData } from "@/shared/components/navigation/navItemData";
import { NavItem } from "@/shared/components/navigation/NavItem";

export default function Navigation(): React.ReactElement {
    return (
        <nav className="flex items-center gap-4">
            {navItemsData.map(navItemData => (
                <NavItem key={navItemData.label} data={navItemData} />
            ))}
        </nav>
    )
}