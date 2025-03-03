import { Autocomplete, TextField } from "@mui/material";

interface AutocompleteFilterProps {
  id: string;
  options: (string | number)[];
  label: string;
  onChange: (value: string | null) => void;
}

const AutocompleteFilter: React.FC<AutocompleteFilterProps> = ({
  id,
  options,
  label,
  onChange,
}) => (
  <Autocomplete
    disablePortal
    id={id}
    options={options}
    onChange={(_, value) => onChange(value ? value.toString() : null)}
    sx={{ borderRadius: "8px", width: 150 }}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            height: 40,
            justifyContent: "center",
          },
          "& .MuiInputLabel-root": {
            lineHeight: "40px",
            transform: "translate(14px, 0px) scale(1)",
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -15px) scale(0.75)",
          },
        }}
      />
    )}
  />
);

export default AutocompleteFilter;
