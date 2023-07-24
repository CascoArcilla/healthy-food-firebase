import { expect } from "vitest";
import { firestorePosts } from "./dummies/firestorePostDummies";
import { mapPostsToIndex } from "./mapPostsToIndex";

describe("When mapPostsToIndex receive a list of FirestorePost", () => {
  it("should map them to a list of post for the index cards", () => {
    const mapped = mapPostsToIndex(firestorePosts);

    expect(mapped).toHaveLength(2);
    expect(mapped).toHaveProperty("0.image");
    expect(mapped).toHaveProperty("0.image.src", firestorePosts[0].image);
    expect(mapped).toHaveProperty("0.image.alt", firestorePosts[0].title);
    expect(mapped).toHaveProperty(
      "0.createdAt",
      firestorePosts[0].createdAt?.toDate(),
    );
    expect(mapped).toHaveProperty("0.createdAtLocale");
  });
});
