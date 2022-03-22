function versionLabelFormat(value: string, compare?: string) {
  let label = value.includes("#")? value:`${compare === value? "new":"override"}#${value}`;
  let [tag, version] = label.split("#");
  
  return { label, tag, version }
};

export { versionLabelFormat };