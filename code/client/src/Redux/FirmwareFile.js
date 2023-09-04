import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLanguage: "cpp",
  firmwareFile: null,
  dynamicCodeObject: null,
  formResult: null,
  algorithmName: null,
  generatedCppCode: null,
  generatedJavaCode: null,
  generatedXmlCode: null,
  generatedCode: null,
};

export const firmwareFileSlice = createSlice({
  name: "firmware_file",
  initialState,
  reducers: {
    change: (state, action) => {
      state.firmwareFile = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setDynamicCode: (state, action) => {
      state.dynamicCodeObject = action.payload;
    },
    setFormResult: (state, action) => {
      state.formResult = action.payload;
    },
    setAlgorithmName: (state, action) => {
      state.algorithmName = action.payload;
    },
    setGeneratedCppCode: (state, action) => {
      state.generatedCppCode = action.payload;
    },
    setGeneratedJavaCode: (state, action) => {
      state.generatedJavaCode = action.payload;
    },
    setGeneratedCode: (state, action) => {
      state.generatedCode = action.payload;
    },
    setGeneratedXmlCode: (state, action) => {
      state.generatedXmlCode = action.payload;
    },
    changeSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  change,
  selectedLanguage,
  setDynamicCode,
  setFormResult,
  setAlgorithmName,
  setGeneratedCppCode,
  setGeneratedJavaCode,
  setGeneratedXmlCode,
  changeSelectedLanguage,
  setGeneratedCode,
  setSelectedLanguage,
} = firmwareFileSlice.actions;

export default firmwareFileSlice.reducer;
