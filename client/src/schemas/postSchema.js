import * as yup from 'yup';


const imageValidation = (value) => {
    if (!value) return true;

    const acceptedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];
    const maxSizeInBytes = 2 * 1024 * 1024;

    const isAcceptedFormat = acceptedFormats.includes(value.type);
    const isWithinMaxSize = value.size <= maxSizeInBytes;

    return isAcceptedFormat && isWithinMaxSize;
};

export const postSchema = yup.object().shape({
    file: yup.mixed()
        .test('fileType', 'Allowed formats are *jpeg, *jpg, *png, *mp4, *mov', imageValidation)
        .test('fileSize', 'The maximum image size is 2 MB', imageValidation),
});