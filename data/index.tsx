export const navLinks = [
    {label: "Home", href: "/"},
    {label: "Portfolio", href: "/portfolio"},
    {label: "W.O.H", href: "/wall-of-highlights"},
]

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

export const socialLinks = [
    {
        icon: <FaLinkedin size={25} />,
        href: "https://www.linkedin.com/in/micah-tidball-a1b28231b/"
    },
    {
        icon: <BiLogoGmail size={25} />,
        href: "mailto:tidball.code@gmail.com"
    },
    {
        icon: <FaGithub size={25} />,
        href: "https://github.com/Not-Micah"
    },
];