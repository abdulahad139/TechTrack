import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer  # type: ignore
from sklearn.metrics.pairwise import cosine_similarity  # type: ignore

def recommend_courses(data, keywords, threshold=0.5):
    # Filter courses by rating > 4.7
    filtered_data = data[data['rating'] > 4.7]

    if keywords:
        # Create a TF-IDF Vectorizer
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(filtered_data['title'])

        # Transform the input keywords to the same TF-IDF space
        keywords_tfidf = vectorizer.transform([keywords])

        # Compute cosine similarity
        cosine_sim = cosine_similarity(keywords_tfidf, tfidf_matrix).flatten()

        # Filter courses that meet the similarity threshold
        similar_indices = [i for i, score in enumerate(cosine_sim) if score >= threshold]
        
        if similar_indices:
            # Get the top 5 most similar courses above the threshold
            top_similar_indices = sorted(similar_indices, key=lambda i: cosine_sim[i], reverse=True)[:9]
            recommended_courses = filtered_data.iloc[top_similar_indices]
        else:
            # No relevant courses found
            return pd.DataFrame()  # Empty DataFrame signals no results
    else:
        # If no keywords, return the top 9 courses by rating
        recommended_courses = filtered_data.head(9)

    return recommended_courses
