import {getRequest} from "./server.js";

export const mapCommunalTypeForRequest = (type) => {
	let value;
	switch (type) {
		case 'Բոլոր Կոմունալներ': {
			return value = 'overall'
		}
		case 'Գազ' : {
			return value = 'gas'
		}
		case 'Ջուր' : {
			return value = 'water'
		}
		case 'Հոսանք' : {
			return value = 'el'
		}
		default: return value = null
	}
};

export const someRequest = async (initials, communalType, phone) => {
	const firstName = initials.split(' ')[0]
	const lastName = initials.split(' ')[1]
	const type = mapCommunalTypeForRequest(communalType)
	//Should contain request to DB for getting data
	const result = await getRequest(firstName, lastName, type, phone);
	if (result) {
		return result;
	} else return null
};

export const CREDENTIALS_REQUEST_TEXT = 'Խնդրում ենք գրեք ձեր անուն ազգանոնը այսպես - Հակոբ Հակոբյան';
export const PHONE_REQUEST = 'Նշեք հեռախոսահամարը առանց +374 և 0';
export const WRONG = 'Տվյալները սխալ են, խնդրում ենք փորձել նորից';
export const OPTIONS = [{ text: 'Բոլոր Կոմունալներ'},{ text: 'Գազ'}, { text: 'Հոսանք'},{ text: 'Ջուր'}];