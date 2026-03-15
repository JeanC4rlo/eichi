import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo(): React.ReactElement {
    return (
        <Link href="/" className="flex items-center gap-3">
            <Image
                src="/logo.svg"
                alt="Logo do Eichi"
                width={52}
                height={28}
                className="flex-shrink-0 "
            />
            <span className="text-2xl font-heading font-bold lowercase">
                Eichi
            </span>
        </Link>
    );
}