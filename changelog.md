# FASTYCRYPT CHANGELOG
---
## **Release 1.1.4**:  *Maintenance Update*
### **User Features**
1. **Padding customization**: It is now possible to customize the padding for encryption methods *(Asymmetric and Symmetric)*.
2. **readAnyway**: It is now possible to read a signed document without verifying if the author is legitimate. *(Signer)*.

### **Development Features**
1. We have migrated from Jest to Mocha Unit Test System.
2. Corrected spelling errors.
3. GitHub reference is now in the package.json
4. changelog.md file started.
5. The methods are optimized to reduce their complexity and some were segmented into other more specific and simpler methods.
6. Issues on GitHub are enabled now, give me your feedback.

### **Internal Features**
1. **createPadding**'s method has been created in **./src/utils.ts**
2. **setupNanoid**'s method has been created in **./src/utils.ts**
3. **segmentDocument**'s method has been created in **./src/utils.ts**
4. **Uint8From**'s method has been created in **./src/utils.ts**
5. New FastyCrypt Type: **IPaddingSettings**
6. New FastyCrypt Type: **IDocumentSegment**
7. New FastyCrypt Type: **IPaddingSetUp**
8. New FastyCrypt Type: **INanoid**
9. New FastyCrypt Type: **IPadding**
10. New FastyCrypt Type: **IPaddingSetUp**
 ---
