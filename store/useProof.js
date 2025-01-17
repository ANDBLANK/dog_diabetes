import { create } from 'zustand';

const useProof = create((set) => ({
  proofs: [], // 증명 리스트를 저장할 배열
  
  // 증명 리스트 설정
  setProofs: (newProofs) => set({ proofs: newProofs }),
  
  // 단일 증명 추가
  addProof: (proof) => set((state) => ({ 
    proofs: [...state.proofs, proof] 
  })),
  
  // 증명 리스트 초기화
  clearProofs: () => set({ proofs: [] }),
}));

export default useProof;
