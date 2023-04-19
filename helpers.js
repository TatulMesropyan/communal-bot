
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

export const someRequest = (initials, communalType, phone) => {
	const firstName = initials.split(' ')[0]
	const lastName = initials.split(' ')[1]
	const type = mapCommunalTypeForRequest(communalType)
	//Should contain request to DB for getting data
	return {firstName, lastName, type, phone}

};

export const CREDENTIALS_REQUEST_TEXT = 'Խնդրում ենք գրեք ձեր անուն ազգանոնը այսպես - Հակոբ Հակոբյան';
export const PHONE_REQUEST = 'Նշեք հեռախոսահամարը առանց +374';
export const WRONG = 'Տվյալները սխալ են, խնդրում ենք փորձել նորից';
export const OPTIONS = [{ text: 'Բոլոր Կոմունալներ'},{ text: 'Գազ'}, { text: 'Հոսանք'},{ text: 'Ջուր'}];