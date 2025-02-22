// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";

// BEGIN EXTRA CODE

import NativeFileDocumentsUtils from "../nativefiledocumentsutils";
import RNFS from "react-native-fs";
import { Platform } from 'react-native';

// END EXTRA CODE

/**
 * Save contents of the file at the specified path to a Mendix FileDocument.
 * 
 * Note that you cannot write content directly to a Mendix file document. You can use the writeFile action to write base64 encoded content to a file and then call this action to save the contents in the Mendix object.
 * @param {string} filepath - The path to the file or directory.
 * @param {"NativeFileDocuments.PathType.FullPath"|"NativeFileDocuments.PathType.DocumentsDirectory"} pathType
 * @param {MxObject} fileDocument
 * @param {string} fileName
 * @param {boolean} writeToLog
 * @returns {Promise.<boolean>}
 */
export async function saveToMendixFileDocument(filepath, pathType, fileDocument, fileName, writeToLog) {
	// BEGIN USER CODE

	if (!filepath) {
		Promise.reject("No file path specified");
	}
	if (!pathType) {
		Promise.reject("No path type specified");
	}
	if (!fileDocument) {
		Promise.reject("No file document specified");
	}
    if (!fileDocument.inheritsFrom("System.FileDocument")) {
        const entity = picfileDocumentture.getEntity();
        Promise.reject(new Error("Entity " + entity + " does not inherit from System.FileDocument"));
    }
	if (!fileName) {
		Promise.reject("No file name specified");
	}
	const guid = fileDocument.getGuid();
	if (writeToLog) {
		NativeFileDocumentsUtils.writeToLog({
			actionName: "saveToMendixFileDocument",
			logType: "Parameters",
			logMessage: JSON.stringify({
				filepath: filepath,
				pathType: pathType,
				guid: guid
			})
		});
	}

	const fullPath = NativeFileDocumentsUtils.getFullPath(filepath, pathType, RNFS, Platform.OS);

	if (writeToLog) {
		NativeFileDocumentsUtils.writeToLog({
			actionName: "saveToMendixFileDocument",
			logType: "Info",
			logMessage: "Full path: " + fullPath
		});
	}

	return new Promise((resolve, reject) => {
		fetch(fullPath)
			.then(res => res.blob())
			.then(blob => {
			const onSuccess = () => resolve(true);
			const onError = (error) => {
				// If this fails, always write a log entry
				NativeFileDocumentsUtils.writeToLog({
					actionName: "saveToMendixFileDocument",
					logType: "Exception",
					logMessage: JSON.stringify(error)
				});
				reject(error)
			};
			mx.data.saveDocument(guid, fileName, {}, blob, onSuccess, onError);
		});
	});

	// END USER CODE
}
