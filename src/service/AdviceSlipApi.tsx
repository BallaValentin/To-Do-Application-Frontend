import { Advice } from '../types/Advice';

export async function fetchRandomAdvice(): Promise<Advice> {
  const response = await fetch('https://api.adviceslip.com/advice');
  if (!response.ok) {
    throw new Error('Failed to fetch random advice');
  }
  const data = await response.json();
  return {
    id: data.slip.id,
    advice: data.slip.advice,
  };
}

export async function fetchAdvicesByKeyword(keyword: string): Promise<Advice[]> {
  const response = await fetch(`https://api.adviceslip.com/advice/search/${keyword}`);
  if (!response.ok) {
    throw new Error('Failed to fetch advices by keyword');
  }
  const data = await response.json();
  return data.slips.map((slip: any) => ({
    id: slip.id,
    advice: slip.advice,
  }));
}
