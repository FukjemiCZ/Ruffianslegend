import { Chip } from "@mui/material";

export default function StatusChip(props: { kind: "dog" | "litter"; value: string }) {
  const { kind, value } = props;

  const map = () => {
    if (kind === "dog") {
      switch (value) {
        case "active":
          return { label: "Aktivní", color: "success" as const };
        case "retired":
          return { label: "V důchodu", color: "warning" as const };
        case "memory":
          return { label: "Vzpomínáme", color: "default" as const };
        default:
          return { label: value, color: "default" as const };
      }
    }

    switch (value) {
      case "planned":
        return { label: "Plánovaný", color: "info" as const };
      case "open":
        return { label: "Otevřený", color: "success" as const };
      case "full":
        return { label: "Plno", color: "warning" as const };
      case "closed":
        return { label: "Uzavřený", color: "default" as const };
      default:
        return { label: value, color: "default" as const };
    }
  };

  const m = map();
  return <Chip size="small" label={m.label} color={m.color} variant="filled" />;
}
