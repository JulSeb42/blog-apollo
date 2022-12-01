/*=============================================== Mutation type ===============================================*/

import { gql } from "apollo-server"

export const MutationType = gql`
    type Mutation {
        login(loginInput: LoginInput): User!
        forgotPassword(forgotInput: ForgotInput): User!
        resetPassword(resetInput: ResetInput): User!

        addUser(addUserInput: AddUserInput): User!
        editUser(editUserInput: EditUserInput): User!
        editPassword(editPasswordInput: EditPasswordInput): User!
        deleteUser(_id: ID!): String
        setUserRole(setUserRoleInput: SetUserRoleInput): User!
        featureUser(featureUserInput: FeatureUserInput): User!
        approveUser(approveUserInput: ApproveUserInput): User!

        newComment(newCommentInput: NewCommentInput): Comment!
        deleteComment(_id: ID!): String

        newPost(newPostInput: NewPostInput): Post!
        editPost(editPostInput: EditPostInput): Post!
        deletePost(_id: ID!): String

        newCategory(newCategoryInput: NewCategoryInput): Category!
        updateCategory(updateCategoryInput: UpdateCategoryInput): Category!
        deleteCategory(_id: ID!): String

        newPage(newPageInput: NewPageInput): Page!
        editPage(editPageInput: EditPageInput): Page!
        deletePage(_id: ID!): String
        showPage(showPageInput: ShowPageInput): Page!

        editGlobal(globalInput: GlobalInput): GlobalData!

        contact(contactInput: ContactInput): String
        editContact(contactPageInput: ContactPageInput): Contact!
        showContact(showContactInput: ShowContactInput): Contact!

        editThankYou(thankYouInput: ThankYouInput): ThankYou!

        createFirstAccount(firstUserInput: FirstUserInput): User!
        createGlobal(createGlobalInput: CreateGlobalInput): GlobalData!
        setupGlobal(_id: ID!): GlobalData!
    }
`
