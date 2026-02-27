import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Link, Typography } from "@mui/material";

export default function Markdown({ content }: { content: string }) {
  return (
    <Box
      sx={{
        "& p": { m: 0, mb: 1.5, lineHeight: 1.75 },
        "& h2": { mt: 3, mb: 1, fontWeight: 900, letterSpacing: -0.3 },
        "& h3": { mt: 2.5, mb: 1, fontWeight: 900 },
        "& ul": { pl: 2.5, mb: 1.5 },
        "& li": { mb: 0.75 }
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => <Link href={String(props.href ?? "#")} target="_blank" rel="noreferrer" underline="hover" />,
          p: (props) => <Typography variant="body1" {...props} />,
          h2: (props) => <Typography variant="h5" {...props} />,
          h3: (props) => <Typography variant="h6" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
