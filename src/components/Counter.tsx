import { Text, TextProps } from "@chakra-ui/react";
import { MechanicalCounter } from "mechanical-counter";

declare interface CounterProps extends TextProps {
  to?: number;
  suffix?: string;
};

function Counter({ 
  to = 0,
  suffix,
  ...rest
}: CounterProps) {
  return (
    <Text
      display="flex"
      alignItems="center"
      {...rest}
    >
      <MechanicalCounter text={to}/>{suffix}
    </Text>
  );
};

export { Counter };