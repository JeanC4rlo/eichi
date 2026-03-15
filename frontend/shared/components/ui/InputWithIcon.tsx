import { UserCircleIcon } from "@heroicons/react/16/solid"
import { FC } from "react"

interface InputWithIconProps {
    label: string,
    Icon: FC<React.SVGProps<SVGSVGElement>>
    type?: string,
    name: string,
    value: string | null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    placeholder?: string
}

export const InputWithIcon = ({
    label,
    Icon,
    type = "text",
    name,
    value,
    onChange,
    required = false,
    placeholder
}: InputWithIconProps): React.ReactElement => {
    return (
        <>
            <label htmlFor={name} className="flex flex-col gap-1">
                <span className="font-body font-bold">{label}</span>
                <div className="
                    flex items-center gap-4 border-2 rounded-full px-2 
                    focus-within:border-[#8159ec] focus-within:bg-[#8159ec]
                    focus-within:text-white font-body transition-all duration-300
                    cursor-pointer
                ">
                    <Icon className="w-8 h-8" />
                    <input
                        type={type}
                        id={name}
                        name={name}
                        value={value ?? ""}
                        onChange={onChange}
                        required={required}
                        placeholder={placeholder}
                        className="w-full focus:outline-0 py-2 cursor-pointer"
                        />
                </div>
            </label>
        </>
    )
}