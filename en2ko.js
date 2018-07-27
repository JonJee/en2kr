const 영어 = "rRseEfaqQtTdwWczxvgkoiOjpuPhynbml";
const 한글 = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ";
const 초성 = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const 중성 = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const 종성 = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
const 첫모음 = 19;

class Enko {
    en2ko(input) {
        let result = '';
        if (input === '' || input === undefined) return result;
        let _초성 = -1, _중성 = -1, _종성 = -1;

        /*
            1. 초성 + 중성 + 종성
            2. 초성 + 중성
            3. 초성
            4. 중성
        */
        for (let i = 0; i < input.length; i++) {
            let char = input[i];
            let index = 영어.indexOf(char);
            let _한글 = 한글[index];
            // 한글이 아니라면
            if (index === -1) {
                // 남아있는 한글 처리
                if (_초성 !== -1) {
                    if (_중성 !== -1) result += this.한글생성(_초성, _중성, _종성);     // 초성 + 중성 + (종성)
                    else result += 초성[_초성]      // 초성만
                } else {
                    if (_중성 !== -1) result += 중성[_중성]    // 중성만
                    else if (_종성 !== -1) result += 종성[_종성]    // 종성만 (복자음)
                }
                _초성 = -1, _중성 = -1, _종성 = -1;
                result += char;
            }
            // 자음이라면
            else if (index < 첫모음) {
                if (_중성 !== -1) {
                    // 중성만 입력됨
                    if (_초성 === -1) {
                        result += 중성[_중성];
                        _중성 = -1;
                        _초성 = 초성.indexOf(_한글);
                    }
                    // 종성
                    else {
                        if (_종성 == -1) {
                            _종성 = 종성.indexOf(_한글);
                            // ㄸ,ㅃ,ㅉ와 같이 종성에 못오는 자음들의 경우 초성으로 처리해야함
                            if (_종성 == -1) {
                                result += this.한글생성(_초성, _중성, _종성);
                                _초성 = 초성.indexOf(_한글);
                                중성 = -1;
                            }
                            // 복자음 처리
                            else if (_종성 === 종성.indexOf('ㄱ') && _한글 === 'ㅅ') _종성 = 종성.indexOf('ㄳ');   // 복자음 ㄳ
                            else if (_종성 === 종성.indexOf('ㄴ')) {
                                if (_한글 === 'ㅈ') _종성 = 종성.indexOf('ㄵ');                                 // 복자음 ㄵ
                                else if (_한글 === 'ㅎ') _종성 = 종성.indexOf('ㄶ');                            // 복자음 ㄶ
                            }
                            else if (_종성 === 종성.indexOf('ㄹ')) {
                                if (_한글 === 'ㄱ') _종성 = 종성.indexOf('ㄺ');                                 // 복자음 ㄺ
                                else if (_한글 === 'ㅁ') _종성 = 종성.indexOf('ㄻ');                            // 복자음 ㄻ
                                else if (_한글 === 'ㅂ') _종성 = 종성.indexOf('ㄼ');                            // 복자음 ㄼ
                                else if (_한글 === 'ㅅ') _종성 = 종성.indexOf('ㄽ');                            // 복자음 ㄽ
                                else if (_한글 === 'ㅌ') _종성 = 종성.indexOf('ㄾ');                            // 복자음 ㄾ
                                else if (_한글 === 'ㅍ') _종성 = 종성.indexOf('ㄿ');                            // 복자음 ㄿ
                                else if (_한글 === 'ㅎ') _종성 = 종성.indexOf('ㅀ');                            // 복자음 ㅀ
                            }
                            else if (_종성 === 종성.indexOf('ㅂ') && _한글 === 'ㅅ') _종성 = 종성.indexOf('ㅄ');   // 복자음 ㅄ
                            // 복자음이 아니므로 초성으로 처리
                            else {
                                result += this.한글생성(_초성, _중성, _종성);
                                _중성 = -1, _종성 = -1;
                                _초성 = 초성.indexOf(_한글);
                            }
                        }
                    }
                } else {
                    if (_초성 === -1) {
                        if (_종성 !== -1) {				// 복자음 후 초성
                            result += 종성[_종성];
                            _종성 = -1;
                        }
                        _초성 = 초성.indexOf(_한글);
                    }
                    // 복자음 처리
                    else if (_초성 === 초성.indexOf('ㄱ') && _한글 === 'ㅅ') _종성 = 종성.indexOf('ㄳ'), _초성 = -1;   // 복자음 ㄳ
                    else if (_초성 === 초성.indexOf('ㄴ')) {
                        if (_한글 === 'ㅈ') _종성 = 종성.indexOf('ㄵ');                                 // 복자음 ㄵ
                        else if (_한글 === 'ㅎ') _종성 = 종성.indexOf('ㄶ');                            // 복자음 ㄶ
                        _초성 = -1;
                    }
                    else if (_초성 === 초성.indexOf('ㄹ')) {
                        if (_한글 === 'ㄱ') _종성 = 종성.indexOf('ㄺ');                                 // 복자음 ㄺ
                        else if (_한글 === 'ㅁ') _종성 = 종성.indexOf('ㄻ');                            // 복자음 ㄻ
                        else if (_한글 === 'ㅂ') _종성 = 종성.indexOf('ㄼ');                            // 복자음 ㄼ
                        else if (_한글 === 'ㅅ') _종성 = 종성.indexOf('ㄽ');                            // 복자음 ㄽ
                        else if (_한글 === 'ㅌ') _종성 = 종성.indexOf('ㄾ');                            // 복자음 ㄾ
                        else if (_한글 === 'ㅍ') _종성 = 종성.indexOf('ㄿ');                            // 복자음 ㄿ
                        else if (_한글 === 'ㅎ') _종성 = 종성.indexOf('ㅀ');                            // 복자음 ㅀ
                        _초성 = -1;
                    }
                    else if (_종성 === 종성.indexOf('ㅂ') && _한글 === 'ㅅ') _종성 = 종성.indexOf('ㅄ'), _초성 = -1;   // 복자음 ㅄ
                    else {      // 단자음 연타
                        result += 초성[_초성];
					    _초성 = 초성.indexOf(_한글);
                    }
                }
            }
            // 모음이라면
            else {
                if (_종성 !== -1) {						// (앞글자 종성), 초성+중성
                    // 복자음 다시 분해
                    var 새초성;			                               // 임시 초성
                    if (_종성 === 종성.indexOf('ㄳ')) {					// ㄱ / ㅅ
                        _종성 = 종성.indexOf('ㄱ');
                        새초성 = 초성.indexOf('ㅅ');
                    } else if (_종성 === 종성.indexOf('ㄵ')) {			// ㄴ / ㅈ
                        _종성 = 종성.indexOf('ㄴ');
                        새초성 = 초성.indexOf('ㅈ');
                    } else if (_종성 === 종성.indexOf('ㄶ')) {			// ㄴ / ㅎ
                        _종성 = 종성.indexOf('ㄴ');
                        새초성 = 초성.indexOf('ㅎ');
                    } else if (_종성 === 종성.indexOf('ㄺ')) {			// ㄹ / ㄱ
                        _종성 = 종성.indexOf('ㄹ');
                        새초성 = 초성.indexOf('ㄱ');
                    } else if (_종성 === 종성.indexOf('ㄻ')) {			// ㄹ / ㅁ
                        _종성 = 종성.indexOf('ㄹ');
                        새초성 = 초성.indexOf('ㅁ');
                    } else if (_종성 === 종성.indexOf('ㄼ')) {			// ㄹ / ㅂ
                        _종성 = 종성.indexOf('ㄹ');
                        새초성 = 초성.indexOf('ㅂ');
                    } else if (_종성 === 종성.indexOf('ㄽ')) {			// ㄹ / ㅅ
                        _종성 = 종성.indexOf('ㄹ');
                        새초성 = 초성.indexOf('ㅅ');
                    } else if (_종성 === 종성.indexOf('ㄾ')) {			// ㄹ / ㅌ
                        _종성 = 종성.indexOf('ㄹ');
                        새초성 = 초성.indexOf('ㅌ');
                    } else if (_종성 === 종성.indexOf('ㄿ')) {			// ㄹ / ㅍ
                        _종성 = 종성.indexOf('ㄹ');
                        새초성 = 초성.indexOf('ㅍ');
                    } else if (_종성 === 종성.indexOf('ㅀ')) {			// ㄹ / ㅎ
                        _종성 = 종성.indexOf('ㄹ');
                        새초성 = 초성.indexOf('ㅎ');
                    } else if (_종성 === 종성.indexOf('ㅄ')) {			// ㅂ / ㅅ
                        _종성 = 종성.indexOf('ㅂ');
                        새초성 = 초성.indexOf('ㅅ');
                    }
                    // 복자음 아님 
                    else {							
                        새초성 = 초성.indexOf(종성[_종성]);
                        _종성 = -1;
                    }
                    // 앞글자가 초성 + 중성 + (종성)
                    if (_초성 != -1) result += this.한글생성(_초성, _중성, _종성);
                    // 복자음만 있음
                    else result += 종성[_종성];
                    _초성 = 새초성;
                    _중성 = -1;
                    _종성 = -1;
                }
                if (_중성 === -1) _중성 = 중성.indexOf(_한글);
                else if (_중성 === 중성.indexOf('ㅗ') && _한글 === 'ㅏ') _중성 = 중성.indexOf('ㅘ');
                else if (_중성 === 중성.indexOf('ㅗ') && _한글 === 'ㅐ') _중성 = 중성.indexOf('ㅙ');
                else if (_중성 === 중성.indexOf('ㅗ') && _한글 === 'ㅣ') _중성 = 중성.indexOf('ㅚ');
                else if (_중성 === 중성.indexOf('ㅜ') && _한글 === 'ㅓ') _중성 = 중성.indexOf('ㅝ');
                else if (_중성 === 중성.indexOf('ㅜ') && _한글 === 'ㅔ') _중성 = 중성.indexOf('ㅞ');
                else if (_중성 === 중성.indexOf('ㅜ') && _한글 === 'ㅣ') _중성 = 중성.indexOf('ㅟ');
                else if (_중성 === 중성.indexOf('ㅡ') && _한글 === 'ㅣ') _중성 = 중성.indexOf('ㅢ');
                // 조합 안되는 모음
                else {
                    // 초성 + 중성 후 중성
                    if (_초성 != -1) {			
                        result += this.한글생성(_초성, _중성, _종성);
                        _초성 = -1;
                    } 
                    // 중성 후 중성
                    else result += 중성[_중성];
                    _중성 = -1;
                    result += _한글;
                }
            }
        }
        // 남아있는 한글 처리
        if (_초성 !== -1) {
            // 초성 + 중성 + (종성)
            if (_중성 !== -1) result += this.한글생성(_초성, _중성, _종성);     
            // 초성만
            else result += 초성[_초성]      
        } else {
            // 중성만
            if (_중성 !== -1) result += 중성[_중성]    
            // 종성만 (복자음)
            else if (_종성 !== -1) result += 종성[_종성]    
        }
        return result;
    }

    한글생성(초, 중, 종) {
        return String.fromCharCode(44032 + 초 * 588 + 중 * 28 + 종 + 1);
    }

    is한글(char) {
        if (char.length > 1) throw new Error("한글자가 아닙니다.");
        return /[ㄱ-ㅎ|ㅏ-ㅣ|기-힣]/.test(char);
    }
}

var enko = new Enko();
console.log(enko.en2ko('안녕!'));
console.log(enko.en2ko('qjshs  123'));
console.log(enko.en2ko('tpdy!'));
console.log(enko.en2ko('fnffnfkffk'));
console.log(enko.en2ko('diffkfl'));
console.log(enko.en2ko('fnffn'));
console.log(enko.en2ko('qnpfrqnpfr'));
console.log(enko.en2ko('nnnn'));
// console.log(한글생성(-1,-1,-1));
// console.log(is한글("f"));

module.exports = Enko;