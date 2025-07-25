import React from "react";
import { Link as RouterLink } from "react-router";

const LinkBehavior = React.forwardRef(function LinkBehavior(props, ref) {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

export default LinkBehavior;
