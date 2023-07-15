export type Background = 'background-1'
    | 'background-2'
    | 'background-3'
    | 'background-4'
    | 'background-5'
    | 'background-6'
    | 'background-7';

export const backgroundMap: { [key in Background]: string } = {
    'background-1': './assets/images/backgrounds/00023-1912416013.png',
    'background-2': './assets/images/backgrounds/00027-3715579090.png',
    'background-3': './assets/images/backgrounds/00042-242405171.png',
    'background-4': './assets/images/backgrounds/00044-242405171.png',
    'background-5': './assets/images/backgrounds/00053-583843164.png',
    'background-6': './assets/images/backgrounds/00059-257665065.png',
    'background-7': './assets/images/backgrounds/00083-937294880.png',
};