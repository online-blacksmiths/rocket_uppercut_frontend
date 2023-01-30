import { ChangeEvent, useRef, useState } from 'react';

import { defaultSkills } from '../mock';
import useCloseClickOutside from 'common/hook/useCloseClickOutside';

export default function useStep2() {
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [skillList, setSkillList] = useState<string[]>(defaultSkills);
  const [selectSkillList, setSelectSkillList] = useState<string[]>([]);
  const [showDegreeList, setShowDegreeList] = useState<boolean>(false);
  const [selectDegree, setSelectDegree] = useState<string>('학사');
  const [showInSchool, setShowInSchool] = useState<boolean>(false);
  const [inSchool, setInSchool] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [company, setCompany] = useState<string>('');

  const degreeDropdownRef = useRef<HTMLDivElement | null>(null);
  const inSchoolDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleChangeStudentState = () => {
    setIsStudent(prev => !prev);
    setSelectDegree('학사');
    setSelectSkillList([]);
    setInSchool('');
  };

  const handleSelectSkill = (skill: string) => {
    if (selectSkillList.includes(skill)) {
      return;
    }

    setSelectSkillList(prev => [...prev, skill]);
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectSkillList(prev => prev.filter(item => item !== skill));
  };

  const handleShowDegreeDropdown = () => {
    setShowDegreeList(prev => !prev);
  };

  const handleShowInSchoolDropdown = () => {
    setShowInSchool(prev => !prev);
  };

  const handlePositionInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  const handleSchoolInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSchool(e.target.value);
  };

  const handleMajorInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMajor(e.target.value);
  };

  const handleCompanyInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value);
  };

  useCloseClickOutside(degreeDropdownRef, () => {
    setShowDegreeList(false);
  });

  useCloseClickOutside(inSchoolDropdownRef, () => {
    setShowInSchool(false);
  });

  return {
    degreeDropdownRef,
    inSchoolDropdownRef,
    isStudent,
    skillList,
    selectSkillList,
    showDegreeList,
    selectDegree,
    showInSchool,
    inSchool,
    position,
    school,
    major,
    company,
    setSelectDegree,
    setInSchool,
    handleChangeStudentState,
    handleSelectSkill,
    handleRemoveSkill,
    handleShowDegreeDropdown,
    handleShowInSchoolDropdown,
    handlePositionInput,
    handleSchoolInput,
    handleMajorInput,
    handleCompanyInput,
  };
}
