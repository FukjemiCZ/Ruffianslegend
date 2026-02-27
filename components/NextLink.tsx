"use client";
import Link, { type LinkProps } from "next/link";

export type NextLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export default Link;
