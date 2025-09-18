export const navLinks = [
    {label: "Experience", href: "/#experience"},
    {label: "Contact", href: "/#contact"},
    {label: "Resume", href: "https://docs.google.com/document/d/1CIw58UN0GNt2kB2r6z-S6WmOSwsaRl0ZKTVzN1FtJDM/edit?usp=sharing"},
]

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

export const socialLinks = [
    {
        icon: <FaLinkedin size={25} />,
        href: "https://www.linkedin.com/in/micah-tid-a1b28231b/"
    },
    {
        icon: <BiLogoGmail size={25} />,
        href: "mailto:tidball.code@gmail.com"
    },
    {
        icon: <FaGithub size={25} />,
        href: "https://github.com/micahtid"
    },
];