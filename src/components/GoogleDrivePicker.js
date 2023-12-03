// import  { useEffect } from 'react';
// import useDrivePicker from 'react-google-drive-picker'

// const GoogleDrivePicker = () => {
//   const [openPicker, authResponse] = useDrivePicker();  
//   const handleOpenPicker = () => {
//     openPicker({
//       clientId: "407985831747-vv1uidfcsftar7701aolsbknfs9kqbmt.apps.googleusercontent.com",
//       developerKey: "AIzaSyB1vunAjbmx_x4Ak3nqESR9N8hVm835uJs",
//       viewId: "DOCS",
//       // token: token, // pass oauth token in case you already have one
//       showUploadView: true,
//       showUploadFolders: true,
//       // customViews: customViewsArray, // custom view
//       callbackFunction: (data) => {
//         if (data.action === 'cancel') {
//           console.log('User clicked cancel/close button')
//         }
//         console.log(data)
//       },
//     })
//   }
//   return (
//     <div>
//       <button onClick={handleOpenPicker}>Open Google Drive Picker</button>
//     </div>
//   )
// }

// export default GoogleDrivePicker;