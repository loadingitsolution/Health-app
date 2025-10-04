export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        WebkitFontSmoothing: "auto",
      },

      "*": {
        boxSizing: "border-box",
      },

      "a:active": {
        textDecoration: "none",
      },

      a: {
        textDecoration: "none",
      },

      body: {
        backgroundColor: "#FFF",
        minHeight: "100dvh",
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none" as const,
        backgroundColor: "#2AB3A3",
        color: "#FFF",
        "&:hover": {
          backgroundColor: "#2AB3A3",
        },
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: "2px",
        backgroundColor: "#F5FAFF",
        height: "48px",
        fontSize: "16px",

        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#E6ECF1 !important",
          borderWidth: "1px !important",
        },

        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E6ECF1 !important",
            borderWidth: "1px !important",
          },
        },

        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E6ECF1 !important",
            borderWidth: "1px !important",
          },
        },

        input: {
          "&::placeholder": {
            color: "#5D686D", // your placeholder color
            fontSize: "15px", // optional, custom size
          },
        },
      },
    },
  },
};
