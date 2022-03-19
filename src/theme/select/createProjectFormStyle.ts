import { StylesConfig } from "react-select";

export function createProjectFormStyle(borderRadius = 0) {
  return {
    control: (style) => {
      return {
        ...style,
        width: "100%",
        backgroundColor: "var(--chakra-colors-gray-50)",
        borderTop: "none !important",
        borderLeft: "none !important",
        borderRight: "none !important",
        borderBottomColor: "var(--chakra-colors-primary-500)",
        borderBottomWidth: 1,
        ":hover": {
          borderBottomColor: "var(--chakra-colors-primary-500)",
        },
        boxShadow: undefined,
        borderRadius,
        flexDirection: "row-reverse"
      };
    },
    indicatorsContainer: (style) => {
      return {
        ...style,
        display: "contents",
        color: "var(--chakra-colors-primary-600) !important"
      };
    },
    dropdownIndicator: (style) => {
      return {
        ...style,
        color: "var(--chakra-colors-primary-600) !important"
      };
    },
    indicatorSeparator: (style) => {
      return {
        ...style,
        display: "none"
      };
    },
    container: (style) => {
      return {
        ...style,
        width: "100%",
        borderRadius: 0
      };
    },
    placeholder: (style) => {
      return {
        ...style,
        color: "var(--chakra-colors-gray-400)"
      };
    },
    singleValue: (style) => {
      return {
        ...style,
        color: "var(--chakra-colors-primary-600)"
      };
    },
    valueContainer: (style) => {
      return {
        ...style,
        paddingLeft: 2
      };
    },
    menu: (style) => {
      return {
        ...style,
        padding: 0,
        margin: 0,
        marginTop: "5px !important",
        border: "none !important",
        borderRadius,
        backgroundColor: "var(--chakra-colors-gray-50)",
        boxShadow: undefined
      };
    },
    menuList: (style) => {
      return {
        ...style,
        margin: 0,
        padding: 0,
        borderRadius
      };
    },
    option: (provided, data) => {
      return {
        ...provided,
        color: "var(--chakra-colors-primary-800)",
        backgroundColor: data.isSelected || data.isFocused? 
        "var(--chakra-colors-primary-50)":"var(--chakra-colors-gray-50)",
        filter: data.isFocused && "brightness(.97)",
        cursor: "pointer",
        padding: 10
      };
    }
  } as StylesConfig;
};