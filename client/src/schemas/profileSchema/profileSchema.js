import * as yup from 'yup';

const imageValidation = (value) => {
    if (!value) return true;

    const acceptedFormats = ['image/jpg', 'image/jpeg', 'image/png'];
    const maxSizeInBytes = 2 * 1024 * 1024;

    const isAcceptedFormat = acceptedFormats.includes(value.type);
    const isWithinMaxSize = value.size <= maxSizeInBytes;

    return isAcceptedFormat && isWithinMaxSize;
};

export const profileSchema = yup.object().shape({
    profilePicture: yup.mixed()
        .test('fileType', 'Allowed formats are *jpeg *jpg *png', imageValidation)
        .test('fileSize', 'The maximum image size is 2 MB', imageValidation),
    coverPicture: yup.mixed()
        .test('fileType', 'Allowed formats are *jpeg *jpg *png', imageValidation)
        .test('fileSize', 'The maximum image size is 2 MB', imageValidation),
});
